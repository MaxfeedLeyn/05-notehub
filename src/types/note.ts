export interface Note{
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";