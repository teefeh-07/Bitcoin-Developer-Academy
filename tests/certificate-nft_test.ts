import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can create a new course",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(1),
                types.ascii("Hello Clarity"),
                types.ascii("Learn the basics of Clarity smart contract language"),
                types.uint(1)
            ], deployer.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectUint(1);
    },
});

Clarinet.test({
    name: "Can mint certificate for completed course",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // First create a course
        let block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(1),
                types.ascii("Hello Clarity"),
                types.ascii("Learn the basics of Clarity smart contract language"),
                types.uint(1)
            ], deployer.address)
        ]);
        
        // Then mint a certificate
        block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(1),
                types.uint(1),
                types.ascii("QmHash123456789")
            ], deployer.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectUint(1);
        
        // Verify certificate data
        let certificateData = chain.callReadOnlyFn(
            'certificate-nft',
            'get-certificate-data',
            [types.uint(1)],
            deployer.address
        );
        
        const certData = certificateData.result.expectSome().expectTuple();
        assertEquals(certData['course-id'], types.uint(1));
        assertEquals(certData['student'], types.principal(student.address));
        assertEquals(certData['skill-level'], types.uint(1));
    },
});

Clarinet.test({
    name: "Cannot mint duplicate certificate for same course",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create course and mint first certificate
        let block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(1),
                types.ascii("Hello Clarity"),
                types.ascii("Learn the basics of Clarity smart contract language"),
                types.uint(1)
            ], deployer.address),
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(1),
                types.uint(1),
                types.ascii("QmHash123456789")
            ], deployer.address)
        ]);
        
        // Try to mint duplicate certificate
        block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(1),
                types.uint(1),
                types.ascii("QmHash987654321")
            ], deployer.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr().expectUint(103); // ERR_ALREADY_CERTIFIED
    },
});

Clarinet.test({
    name: "Only contract owner can mint certificates",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        const unauthorized = accounts.get('wallet_2')!;
        
        // Create course as deployer
        let block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(1),
                types.ascii("Hello Clarity"),
                types.ascii("Learn the basics of Clarity smart contract language"),
                types.uint(1)
            ], deployer.address)
        ]);
        
        // Try to mint certificate as unauthorized user
        block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(1),
                types.uint(1),
                types.ascii("QmHash123456789")
            ], unauthorized.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr().expectUint(100); // ERR_OWNER_ONLY
    },
});

Clarinet.test({
    name: "Can transfer certificate NFT",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        const recipient = accounts.get('wallet_2')!;
        
        // Create course and mint certificate
        let block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(1),
                types.ascii("Hello Clarity"),
                types.ascii("Learn the basics of Clarity smart contract language"),
                types.uint(1)
            ], deployer.address),
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(1),
                types.uint(1),
                types.ascii("QmHash123456789")
            ], deployer.address)
        ]);
        
        // Transfer certificate
        block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'transfer', [
                types.uint(1),
                types.principal(student.address),
                types.principal(recipient.address)
            ], student.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "Can get student certificates",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create multiple courses and mint certificates
        let block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(1),
                types.ascii("Hello Clarity"),
                types.ascii("Learn the basics of Clarity"),
                types.uint(1)
            ], deployer.address),
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(2),
                types.ascii("Advanced Clarity"),
                types.ascii("Advanced Clarity concepts"),
                types.uint(3)
            ], deployer.address),
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(1),
                types.uint(1),
                types.ascii("QmHash1")
            ], deployer.address),
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(2),
                types.uint(3),
                types.ascii("QmHash2")
            ], deployer.address)
        ]);
        
        // Get student certificates
        let certificates = chain.callReadOnlyFn(
            'certificate-nft',
            'get-student-certificates',
            [types.principal(student.address)],
            deployer.address
        );
        
        const certList = certificates.result.expectList();
        assertEquals(certList.length, 2);
    },
});

Clarinet.test({
    name: "Can check course completion status",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create course
        let block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'create-course', [
                types.uint(1),
                types.ascii("Hello Clarity"),
                types.ascii("Learn the basics of Clarity"),
                types.uint(1)
            ], deployer.address)
        ]);
        
        // Check completion status before certificate
        let completionStatus = chain.callReadOnlyFn(
            'certificate-nft',
            'has-completed-course',
            [types.uint(1), types.principal(student.address)],
            deployer.address
        );
        completionStatus.result.expectBool(false);
        
        // Mint certificate
        block = chain.mineBlock([
            Tx.contractCall('certificate-nft', 'mint-certificate', [
                types.principal(student.address),
                types.uint(1),
                types.uint(1),
                types.ascii("QmHash1")
            ], deployer.address)
        ]);
        
        // Check completion status after certificate
        completionStatus = chain.callReadOnlyFn(
            'certificate-nft',
            'has-completed-course',
            [types.uint(1), types.principal(student.address)],
            deployer.address
        );
        completionStatus.result.expectBool(true);
    },
});
