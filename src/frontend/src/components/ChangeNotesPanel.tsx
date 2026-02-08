import { useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

/**
 * Admin-only Change Notes panel with localStorage persistence and clipboard copy.
 * Allows admins to track changes and copy notes to clipboard with confirmation.
 */
export function ChangeNotesPanel() {
  const [notes, setNotes] = useLocalStorageState('admin-change-notes', '');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="bg-black border-2 border-neon-green/30 rounded-lg p-6 cyber-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-neon-green neon-glow">Change Notes</h3>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="border-neon-green/30 text-neon-green hover:bg-neon-green/10 hover:border-neon-green transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied to clipboard
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
        
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Track your changes here... (auto-saved to browser)"
          className="min-h-[150px] bg-black border-neon-green/30 text-white placeholder:text-gray-500 focus:border-neon-green focus:ring-neon-green/20 resize-y"
        />
        
        <p className="text-xs text-gray-500 mt-2">
          Notes are saved automatically to your browser
        </p>
      </div>
    </div>
  );
}
