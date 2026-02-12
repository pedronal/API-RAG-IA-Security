import {AuditEventType} from "./AuditEventTypes";

export interface AuditEvent {
    readonly type: AuditEventType;
    readonly documentId: string;
    readonly actor: string;
    readonly timestamp: Date;
    readonly metadata?: Record<string, unknown>;
}