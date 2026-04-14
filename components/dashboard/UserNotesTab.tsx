'use client';

import React, { useState } from 'react';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';

interface Note {
    id: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
}

interface UserNotesTabProps {
    userId: string;
}

const defaultNotes: Note[] = [
    {
        id: '1',
        author: 'Support Team (Alice)',
        content: 'User contacted regarding failed uploads. Issue was related to file format.',
        createdAt: '2024-04-12 10:30 AM',
        updatedAt: '2024-04-12 11:00 AM',
    },
    {
        id: '2',
        author: 'Admin (Bob)',
        content: 'Manually reviewed subscription mismatch. Resolved by syncing subscription data.',
        createdAt: '2024-04-10 03:15 PM',
    },
];

export default function UserNotesTab({ userId }: UserNotesTabProps) {
    const [notes, setNotes] = useState<Note[]>(defaultNotes);
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState('');

    const handleAddNote = () => {
        if (newNoteContent.trim()) {
            const newNote: Note = {
                id: Date.now().toString(),
                author: 'Current Admin',
                content: newNoteContent,
                createdAt: new Date().toLocaleString(),
            };
            setNotes([newNote, ...notes]);
            setNewNoteContent('');
            setShowAddNote(false);
        }
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const handleEditNote = (id: string, content: string) => {
        setEditingId(id);
        setEditingContent(content);
    };

    const handleUpdateNote = (id: string) => {
        setNotes(notes.map(n =>
            n.id === id ? { ...n, content: editingContent, updatedAt: new Date().toLocaleString() } : n
        ));
        setEditingId(null);
        setEditingContent('');
    };

    return (
        <div className="space-y-6">
            {/* Add Note Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Internal Notes</h3>
                    {!showAddNote && (
                        <button
                            onClick={() => setShowAddNote(true)}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span>Add Note</span>
                        </button>
                    )}
                </div>

                {showAddNote && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <textarea
                            value={newNoteContent}
                            onChange={(e) => setNewNoteContent(e.target.value)}
                            placeholder="Write your note here..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                        />
                        <div className="flex space-x-3 mt-3">
                            <button
                                onClick={handleAddNote}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddNote(false);
                                    setNewNoteContent('');
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Notes List */}
            <div className="space-y-4">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="bg-white rounded-lg border border-gray-200 p-4">
                            {editingId === note.id ? (
                                <div>
                                    <textarea
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
                                        rows={3}
                                    />
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleUpdateNote(note.id)}
                                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="px-3 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-900">{note.author}</p>
                                            <p className="text-xs text-gray-600">
                                                {note.createdAt}
                                                {note.updatedAt && ` (updated: ${note.updatedAt})`}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditNote(note.id, note.content)}
                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteNote(note.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{note.content}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                        <p className="text-gray-600">No notes yet. Add your first note using the button above.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
