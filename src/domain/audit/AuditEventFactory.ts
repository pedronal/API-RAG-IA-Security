import {AuditEvent} from "./AuditEvent";
import {AuditEventTypes} from "./AuditEventTypes";

export class AuditEventFactory {

    static documentReceived(documentId: string, actor: string): AuditEvent {
        return {
            type: AuditEventTypes.DOCUMENT_RECEIVED,
            documentId,
            actor,
            timestamp: new Date()

        }
    }

    static documentStored(documentId: string, actor: string): AuditEvent {
        return {
            type: AuditEventTypes.DOCUMENT_STORED,
            documentId,
            actor,
            timestamp: new Date()
        }
    }
}