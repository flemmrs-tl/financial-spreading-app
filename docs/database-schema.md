# Financial Spreading Application Database Schema

## Core Entities

### Users
- user_id (PK)
- username
- email
- password_hash
- first_name
- last_name
- role_id (FK to Roles)
- created_at
- updated_at
- last_login_at

### Roles
- role_id (PK)
- name
- description
- permissions (JSON)
- created_at
- updated_at

### Organizations
- organization_id (PK)
- name
- description
- industry
- tax_id
- created_at
- updated_at

### Clients
- client_id (PK)
- organization_id (FK to Organizations)
- name
- tax_id
- industry_code
- address
- contact_info (JSON)
- created_at
- updated_at

## Document Management

### Documents
- document_id (PK)
- client_id (FK to Clients)
- document_type_id (FK to DocumentTypes)
- name
- description
- file_path
- file_size
- mime_type
- upload_date
- status
- processed_by (FK to Users)
- processing_status
- created_at
- updated_at

### DocumentTypes
- document_type_id (PK)
- name
- description
- processing_template
- created_at
- updated_at

### DocumentPages
- page_id (PK)
- document_id (FK to Documents)
- page_number
- content_text
- ocr_confidence
- image_path
- created_at
- updated_at

## Financial Data

### FinancialStatements
- statement_id (PK)
- client_id (FK to Clients)
- document_id (FK to Documents)
- statement_type (balance_sheet, income_statement, cash_flow)
- period_start_date
- period_end_date
- time_period_months
- fiscal_year
- currency
- status
- created_by (FK to Users)
- created_at
- updated_at

### ChartOfAccounts
- account_id (PK)
- parent_id (FK to self, for hierarchy)
- organization_id (FK to Organizations)
- account_code
- account_name
- account_type
- category
- subcategory
- is_active
- created_at
- updated_at

### FinancialLineItems
- line_item_id (PK)
- statement_id (FK to FinancialStatements)
- account_id (FK to ChartOfAccounts)
- amount
- normalized_amount
- original_text
- confidence_score
- is_manual_override
- created_at
- updated_at

### FinancialRatios
- ratio_id (PK)
- statement_id (FK to FinancialStatements)
- ratio_type
- value
- industry_average
- created_at
- updated_at

## Template Management

### AnalysisTemplates
- template_id (PK)
- name
- description
- industry
- template_data (JSON)
- is_active
- created_by (FK to Users)
- created_at
- updated_at

### TemplateRules
- rule_id (PK)
- template_id (FK to AnalysisTemplates)
- rule_type
- condition
- action
- priority
- created_at
- updated_at

## Integration

### IntegrationSources
- source_id (PK)
- name
- description
- connection_details (JSON, encrypted)
- status
- last_sync_at
- created_at
- updated_at

### IntegrationLogs
- log_id (PK)
- source_id (FK to IntegrationSources)
- operation
- status
- message
- details (JSON)
- created_at

## Audit and Reporting

### AuditLogs
- log_id (PK)
- user_id (FK to Users)
- action
- entity_type
- entity_id
- details (JSON)
- ip_address
- user_agent
- created_at

### Reports
- report_id (PK)
- name
- description
- report_type
- parameters (JSON)
- created_by (FK to Users)
- schedule (cron expression, optional)
- last_generated_at
- created_at
- updated_at

### ReportExecutions
- execution_id (PK)
- report_id (FK to Reports)
- status
- result_file_path
- execution_time
- created_at