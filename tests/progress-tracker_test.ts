import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can create a new module",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Introduction to Clarity"),
                types.ascii("Learn the basics of Clarity syntax"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectUint(1);
    },
});

Clarinet.test({
    name: "Can complete a module and track progress",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create a module
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Introduction to Clarity"),
                types.ascii("Learn the basics of Clarity syntax"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address)
        ]);
        
        // Complete the module
        block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(45),
                types.uint(95)
            ], student.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        const result = block.receipts[0].result.expectOk().expectTuple();
        assertEquals(result['points-earned'], types.uint(10));
        assertEquals(result['new-total-points'], types.uint(10));
        assertEquals(result['streak'], types.uint(1));
    },
});

Clarinet.test({
    name: "Cannot complete the same module twice",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create and complete a module
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Introduction to Clarity"),
                types.ascii("Learn the basics of Clarity syntax"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address),
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(45),
                types.uint(95)
            ], student.address)
        ]);
        
        // Try to complete the same module again
        block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(30),
                types.uint(100)
            ], student.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr().expectUint(102); // ERR_MODULE_ALREADY_COMPLETED
    },
});

Clarinet.test({
    name: "Can track user progress correctly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create multiple modules
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Module 1"),
                types.ascii("First module"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address),
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(2),
                types.uint(1),
                types.ascii("Module 2"),
                types.ascii("Second module"),
                types.uint(15),
                types.uint(2),
                types.uint(90)
            ], deployer.address)
        ]);
        
        // Complete both modules
        block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(45),
                types.uint(95)
            ], student.address),
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(2),
                types.uint(75),
                types.uint(88)
            ], student.address)
        ]);
        
        // Check user progress
        let progress = chain.callReadOnlyFn(
            'progress-tracker',
            'get-user-progress',
            [types.principal(student.address)],
            deployer.address
        );
        
        const progressData = progress.result.expectSome().expectTuple();
        assertEquals(progressData['total-points'], types.uint(25));
        assertEquals(progressData['current-streak'], types.uint(1));
        assertEquals(progressData['skill-level'], types.uint(1)); // Still beginner with 25 points
        
        const completedModules = progressData['completed-modules'].expectList();
        assertEquals(completedModules.length, 2);
    },
});

Clarinet.test({
    name: "Can get course progress",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create modules for course 1
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Module 1"),
                types.ascii("First module"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address),
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(2),
                types.uint(1),
                types.ascii("Module 2"),
                types.ascii("Second module"),
                types.uint(15),
                types.uint(2),
                types.uint(90)
            ], deployer.address),
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(3),
                types.uint(1),
                types.ascii("Module 3"),
                types.ascii("Third module"),
                types.uint(20),
                types.uint(3),
                types.uint(120)
            ], deployer.address)
        ]);
        
        // Complete first module
        block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(45),
                types.uint(95)
            ], student.address)
        ]);
        
        // Check course progress
        let courseProgress = chain.callReadOnlyFn(
            'progress-tracker',
            'get-course-progress',
            [types.uint(1), types.principal(student.address)],
            deployer.address
        );
        
        const progressData = courseProgress.result.expectTuple();
        assertEquals(progressData['total-modules'], types.uint(3));
        assertEquals(progressData['completed-modules'], types.uint(1));
        assertEquals(progressData['completion-percentage'], types.uint(33)); // 1/3 * 100 = 33
    },
});

Clarinet.test({
    name: "Can check module completion status",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create module
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Module 1"),
                types.ascii("First module"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address)
        ]);
        
        // Check completion status before completing
        let completionStatus = chain.callReadOnlyFn(
            'progress-tracker',
            'has-completed-module',
            [types.uint(1), types.principal(student.address)],
            deployer.address
        );
        completionStatus.result.expectBool(false);
        
        // Complete module
        block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(45),
                types.uint(95)
            ], student.address)
        ]);
        
        // Check completion status after completing
        completionStatus = chain.callReadOnlyFn(
            'progress-tracker',
            'has-completed-module',
            [types.uint(1), types.principal(student.address)],
            deployer.address
        );
        completionStatus.result.expectBool(true);
    },
});

Clarinet.test({
    name: "Only owner can create modules",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const unauthorized = accounts.get('wallet_1')!;
        
        // Try to create module as unauthorized user
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Module 1"),
                types.ascii("First module"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], unauthorized.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectErr().expectUint(100); // ERR_OWNER_ONLY
    },
});

Clarinet.test({
    name: "Can get module completion data",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student = accounts.get('wallet_1')!;
        
        // Create and complete module
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Module 1"),
                types.ascii("First module"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address),
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(45),
                types.uint(95)
            ], student.address)
        ]);
        
        // Get completion data
        let completionData = chain.callReadOnlyFn(
            'progress-tracker',
            'get-module-completion-data',
            [types.uint(1), types.principal(student.address)],
            deployer.address
        );
        
        const data = completionData.result.expectSome().expectTuple();
        assertEquals(data['time-spent'], types.uint(45));
        assertEquals(data['score'], types.uint(95));
        assertEquals(data['attempts'], types.uint(1));
    },
});

Clarinet.test({
    name: "Can get total stats",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const student1 = accounts.get('wallet_1')!;
        const student2 = accounts.get('wallet_2')!;
        
        // Create modules and have students complete them
        let block = chain.mineBlock([
            Tx.contractCall('progress-tracker', 'create-module', [
                types.uint(1),
                types.uint(1),
                types.ascii("Module 1"),
                types.ascii("First module"),
                types.uint(10),
                types.uint(1),
                types.uint(60)
            ], deployer.address),
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(45),
                types.uint(95)
            ], student1.address),
            Tx.contractCall('progress-tracker', 'complete-module', [
                types.uint(1),
                types.uint(50),
                types.uint(88)
            ], student2.address)
        ]);
        
        // Get total stats
        let stats = chain.callReadOnlyFn(
            'progress-tracker',
            'get-total-stats',
            [],
            deployer.address
        );
        
        const statsData = stats.result.expectTuple();
        assertEquals(statsData['total-students'], types.uint(2));
        assertEquals(statsData['total-modules-completed'], types.uint(2));
    },
});
