'use client'

import { useState } from 'react'

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
  parameters?: Parameter[]
  response: any
  example: string
}

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
}

interface ApiSection {
  title: string
  description: string
  endpoints: ApiEndpoint[]
}

const apiSections: ApiSection[] = [
  {
    title: 'Authentication',
    description: 'Authenticate with the Bitcoin Developer Academy API',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/connect',
        description: 'Connect wallet and authenticate user',
        parameters: [
          { name: 'address', type: 'string', required: true, description: 'Stacks wallet address' },
          { name: 'signature', type: 'string', required: true, description: 'Signed message for verification' },
          { name: 'publicKey', type: 'string', required: true, description: 'User public key' }
        ],
        response: {
          success: true,
          token: 'jwt_token_here',
          user: {
            address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
            bnsName: 'alice.btc',
            joinedAt: '2024-01-15T10:30:00Z'
          }
        },
        example: `curl -X POST https://api.bitcoindev.academy/api/auth/connect \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    "signature": "signature_here",
    "publicKey": "public_key_here"
  }'`
      }
    ]
  },
  {
    title: 'User Progress',
    description: 'Track and retrieve user learning progress',
    endpoints: [
      {
        method: 'GET',
        path: '/api/users/{address}/progress',
        description: 'Get user progress across all tutorials',
        parameters: [
          { name: 'address', type: 'string', required: true, description: 'User Stacks address' }
        ],
        response: {
          address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          totalTutorials: 3,
          completedTutorials: 2,
          totalExercises: 15,
          completedExercises: 12,
          skillLevel: 2,
          certificates: [
            {
              tokenId: 1,
              courseId: 1,
              courseName: 'Hello Clarity',
              completionDate: '2024-01-15T14:30:00Z'
            }
          ]
        },
        example: `curl -X GET https://api.bitcoindev.academy/api/users/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM/progress \\
  -H "Authorization: Bearer jwt_token_here"`
      },
      {
        method: 'POST',
        path: '/api/users/{address}/progress',
        description: 'Update user progress for a specific exercise',
        parameters: [
          { name: 'address', type: 'string', required: true, description: 'User Stacks address' },
          { name: 'tutorialId', type: 'number', required: true, description: 'Tutorial ID' },
          { name: 'exerciseId', type: 'number', required: true, description: 'Exercise ID' },
          { name: 'completed', type: 'boolean', required: true, description: 'Exercise completion status' },
          { name: 'code', type: 'string', required: false, description: 'User submitted code' }
        ],
        response: {
          success: true,
          progress: {
            tutorialId: 1,
            exerciseId: 3,
            completed: true,
            completedAt: '2024-01-20T16:45:00Z'
          }
        },
        example: `curl -X POST https://api.bitcoindev.academy/api/users/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM/progress \\
  -H "Authorization: Bearer jwt_token_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tutorialId": 1,
    "exerciseId": 3,
    "completed": true,
    "code": "(define-public (hello) (ok \\"Hello World\\"))"
  }'`
      }
    ]
  },
  {
    title: 'Certificates',
    description: 'Manage and verify NFT certificates',
    endpoints: [
      {
        method: 'GET',
        path: '/api/certificates/{tokenId}',
        description: 'Get certificate details by token ID',
        parameters: [
          { name: 'tokenId', type: 'number', required: true, description: 'Certificate token ID' }
        ],
        response: {
          tokenId: 1,
          courseId: 1,
          courseName: 'Hello Clarity',
          recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          completionDate: '2024-01-15T14:30:00Z',
          skillLevel: 1,
          ipfsMetadata: 'QmHash123456789',
          transactionId: '0x1234567890abcdef1234567890abcdef12345678',
          verified: true
        },
        example: `curl -X GET https://api.bitcoindev.academy/api/certificates/1`
      },
      {
        method: 'POST',
        path: '/api/certificates/mint',
        description: 'Mint a new certificate NFT',
        parameters: [
          { name: 'recipient', type: 'string', required: true, description: 'Recipient Stacks address' },
          { name: 'courseId', type: 'number', required: true, description: 'Completed course ID' }
        ],
        response: {
          success: true,
          tokenId: 123,
          transactionId: '0xabcdef1234567890abcdef1234567890abcdef12',
          ipfsHash: 'QmNewHash987654321'
        },
        example: `curl -X POST https://api.bitcoindev.academy/api/certificates/mint \\
  -H "Authorization: Bearer jwt_token_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "recipient": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    "courseId": 1
  }'`
      }
    ]
  }
]

export default function ApiDocsPage() {
  const [selectedSection, setSelectedSection] = useState<string>(apiSections[0].title)
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null)

  const currentSection = apiSections.find(section => section.title === selectedSection)

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800'
      case 'POST': return 'bg-blue-100 text-blue-800'
      case 'PUT': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <section className="pt-16 pb-12 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              RESTful API Reference
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              API Documentation
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Complete API reference for integrating with Bitcoin Developer Academy and the Stacks blockchain ecosystem.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-yellow-800 text-sm">
                <strong>Base URL:</strong> https://api.bitcoindev.academy
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Sections</h3>
              <nav className="space-y-2">
                {apiSections.map((section) => (
                  <button
                    key={section.title}
                    onClick={() => {
                      setSelectedSection(section.title)
                      setSelectedEndpoint(null)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSection === section.title
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <a href="#authentication" className="block text-gray-600 hover:text-primary">
                    Authentication
                  </a>
                  <a href="#rate-limits" className="block text-gray-600 hover:text-primary">
                    Rate Limits
                  </a>
                  <a href="#errors" className="block text-gray-600 hover:text-primary">
                    Error Codes
                  </a>
                  <a href="#sdks" className="block text-gray-600 hover:text-primary">
                    SDKs & Libraries
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentSection && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentSection.title}</h2>
                  <p className="text-gray-600">{currentSection.description}</p>
                </div>

                <div className="space-y-8">
                  {currentSection.endpoints.map((endpoint, index) => (
                    <div key={index} className="bg-custom-purple rounded-lg shadow-md border border-gray-300 overflow-hidden">
                      {/* Endpoint Header */}
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded text-sm font-medium ${getMethodColor(endpoint.method)}`}>
                              {endpoint.method}
                            </span>
                            <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                          </div>
                          <button
                            onClick={() => setSelectedEndpoint(selectedEndpoint?.path === endpoint.path ? null : endpoint)}
                            className="text-primary hover:text-primary-dark"
                          >
                            {selectedEndpoint?.path === endpoint.path ? 'Hide Details' : 'Show Details'}
                          </button>
                        </div>
                        <p className="text-gray-600">{endpoint.description}</p>
                      </div>

                      {/* Endpoint Details */}
                      {selectedEndpoint?.path === endpoint.path && (
                        <div className="p-6 space-y-6">
                          {/* Parameters */}
                          {endpoint.parameters && endpoint.parameters.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">Parameters</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-gray-200">
                                      <th className="text-left py-2 font-medium text-gray-900">Name</th>
                                      <th className="text-left py-2 font-medium text-gray-900">Type</th>
                                      <th className="text-left py-2 font-medium text-gray-900">Required</th>
                                      <th className="text-left py-2 font-medium text-gray-900">Description</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {endpoint.parameters.map((param, paramIndex) => (
                                      <tr key={paramIndex} className="border-b border-gray-100">
                                        <td className="py-2 font-mono text-primary">{param.name}</td>
                                        <td className="py-2 text-gray-600">{param.type}</td>
                                        <td className="py-2">
                                          <span className={`px-2 py-1 rounded text-xs ${
                                            param.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                                          }`}>
                                            {param.required ? 'Required' : 'Optional'}
                                          </span>
                                        </td>
                                        <td className="py-2 text-gray-600">{param.description}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Response */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                            </pre>
                          </div>

                          {/* Example */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Example</h4>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{endpoint.example}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
            <p className="text-gray-600 mb-4">
              Most API endpoints require authentication using a JWT token obtained through wallet connection.
            </p>
            <div className="bg-gray-50 rounded p-3">
              <code className="text-sm">Authorization: Bearer your_jwt_token_here</code>
            </div>
          </div>

          <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limits</h3>
            <p className="text-gray-600 mb-4">
              API requests are rate limited to ensure fair usage and system stability.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 100 requests per minute for authenticated users</li>
              <li>• 20 requests per minute for unauthenticated users</li>
              <li>• 1000 requests per hour for premium users</li>
            </ul>
          </div>

          <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Codes</h3>
            <p className="text-gray-600 mb-4">
              The API uses standard HTTP status codes to indicate success or failure.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-mono">200</span>
                <span className="text-gray-600">Success</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">400</span>
                <span className="text-gray-600">Bad Request</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">401</span>
                <span className="text-gray-600">Unauthorized</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">429</span>
                <span className="text-gray-600">Rate Limited</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">500</span>
                <span className="text-gray-600">Server Error</span>
              </div>
            </div>
          </div>

          <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">SDKs & Libraries</h3>
            <p className="text-gray-600 mb-4">
              Official and community SDKs to integrate with our API.
            </p>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-primary hover:text-primary-dark">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                </svg>
                JavaScript SDK
              </a>
              <a href="#" className="flex items-center text-primary hover:text-primary-dark">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                </svg>
                Python SDK
              </a>
              <a href="#" className="flex items-center text-primary hover:text-primary-dark">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                </svg>
                REST API
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
