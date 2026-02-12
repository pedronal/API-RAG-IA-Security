export const AuditEventTypes = {
    DOCUMENT_RECEIVED: 'DOCUMENT_RECEIVED',
    HASH_GENERATED: 'HASH_GENERATED',
    DOCUMENT_STORED: 'DOCUMENT_STORED',
    INTEGRITY_CHECK_FAILED: 'INTEGRITY_CHECK_FAILED'
} as const;

export type AuditEventType = typeof AuditEventTypes[keyof typeof AuditEventTypes];