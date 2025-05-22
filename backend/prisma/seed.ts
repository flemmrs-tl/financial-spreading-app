import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator with full access to all features',
      permissions: {
        users: ['create', 'read', 'update', 'delete'],
        clients: ['create', 'read', 'update', 'delete'],
        documents: ['create', 'read', 'update', 'delete', 'process'],
        financialStatements: ['create', 'read', 'update', 'delete', 'analyze'],
        reports: ['create', 'read', 'update', 'delete', 'schedule'],
        settings: ['read', 'update'],
      },
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      description: 'Standard user with limited access',
      permissions: {
        users: ['read'],
        clients: ['create', 'read', 'update'],
        documents: ['create', 'read', 'update', 'process'],
        financialStatements: ['create', 'read', 'update', 'analyze'],
        reports: ['create', 'read', 'update', 'schedule'],
        settings: ['read'],
      },
    },
  });

  const guestRole = await prisma.role.upsert({
    where: { name: 'guest' },
    update: {},
    create: {
      name: 'guest',
      description: 'Guest user with read-only access',
      permissions: {
        users: ['read'],
        clients: ['read'],
        documents: ['read'],
        financialStatements: ['read'],
        reports: ['read'],
        settings: ['read'],
      },
    },
  });

  console.log('Roles created:', { adminRole, userRole, guestRole });

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      roleId: adminRole.id,
    },
  });

  console.log('Admin user created:', adminUser);

  // Create an organization
  const organization = await prisma.organization.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Demo Organization',
      description: 'A demo organization for testing',
      industry: 'Financial Services',
    },
  });

  console.log('Organization created:', organization);

  // Create document types
  const balanceSheetType = await prisma.documentType.upsert({
    where: { name: 'Balance Sheet' },
    update: {},
    create: {
      name: 'Balance Sheet',
      description: 'A financial statement that reports a company\'s assets, liabilities, and equity',
      processingTemplate: {
        sections: ['assets', 'liabilities', 'equity'],
        standardAccounts: true,
      },
    },
  });

  const incomeStatementType = await prisma.documentType.upsert({
    where: { name: 'Income Statement' },
    update: {},
    create: {
      name: 'Income Statement',
      description: 'A financial statement that shows revenues, expenses, and profit/loss for a specific period',
      processingTemplate: {
        sections: ['revenue', 'expenses', 'profit_loss'],
        standardAccounts: true,
      },
    },
  });

  const cashFlowType = await prisma.documentType.upsert({
    where: { name: 'Cash Flow Statement' },
    update: {},
    create: {
      name: 'Cash Flow Statement',
      description: 'A financial statement that shows cash inflows and outflows during a specific period',
      processingTemplate: {
        sections: ['operating', 'investing', 'financing'],
        standardAccounts: true,
      },
    },
  });

  console.log('Document types created:', { balanceSheetType, incomeStatementType, cashFlowType });

  // Create some standard chart of accounts
  // This is just a simplified example
  const assetAccounts = [
    { code: '1000', name: 'Cash', type: 'asset', category: 'current_asset' },
    { code: '1100', name: 'Accounts Receivable', type: 'asset', category: 'current_asset' },
    { code: '1200', name: 'Inventory', type: 'asset', category: 'current_asset' },
    { code: '1500', name: 'Property, Plant & Equipment', type: 'asset', category: 'fixed_asset' },
    { code: '1600', name: 'Accumulated Depreciation', type: 'asset', category: 'fixed_asset' },
  ];

  const liabilityAccounts = [
    { code: '2000', name: 'Accounts Payable', type: 'liability', category: 'current_liability' },
    { code: '2100', name: 'Accrued Expenses', type: 'liability', category: 'current_liability' },
    { code: '2300', name: 'Short-Term Loans', type: 'liability', category: 'current_liability' },
    { code: '2700', name: 'Long-Term Debt', type: 'liability', category: 'long_term_liability' },
  ];

  const equityAccounts = [
    { code: '3000', name: 'Common Stock', type: 'equity', category: 'equity' },
    { code: '3100', name: 'Retained Earnings', type: 'equity', category: 'equity' },
    { code: '3200', name: 'Additional Paid-In Capital', type: 'equity', category: 'equity' },
  ];

  const revenueAccounts = [
    { code: '4000', name: 'Sales Revenue', type: 'revenue', category: 'revenue' },
    { code: '4100', name: 'Service Revenue', type: 'revenue', category: 'revenue' },
    { code: '4200', name: 'Interest Income', type: 'revenue', category: 'revenue' },
  ];

  const expenseAccounts = [
    { code: '5000', name: 'Cost of Goods Sold', type: 'expense', category: 'expense' },
    { code: '5100', name: 'Salaries Expense', type: 'expense', category: 'expense' },
    { code: '5200', name: 'Rent Expense', type: 'expense', category: 'expense' },
    { code: '5300', name: 'Utilities Expense', type: 'expense', category: 'expense' },
    { code: '5400', name: 'Depreciation Expense', type: 'expense', category: 'expense' },
    { code: '5500', name: 'Interest Expense', type: 'expense', category: 'expense' },
  ];

  const allAccounts = [
    ...assetAccounts,
    ...liabilityAccounts,
    ...equityAccounts,
    ...revenueAccounts,
    ...expenseAccounts,
  ];

  // Create chart of accounts for the organization
  for (const account of allAccounts) {
    await prisma.chartOfAccount.upsert({
      where: {
        organizationId_accountCode: {
          organizationId: organization.id,
          accountCode: account.code,
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        accountCode: account.code,
        accountName: account.name,
        accountType: account.type,
        category: account.category,
        isActive: true,
      },
    });
  }

  console.log(`Created ${allAccounts.length} chart of accounts entries`);

  // Create a demo client
  const client = await prisma.client.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      organizationId: organization.id,
      name: 'Demo Client Inc.',
      taxId: '12-3456789',
      industryCode: 'NAICS-523',
      address: '123 Main St, Anytown, USA',
      contactInfo: {
        primaryContact: 'John Doe',
        email: 'john.doe@democlient.com',
        phone: '(555) 123-4567',
      },
    },
  });

  console.log('Demo client created:', client);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });