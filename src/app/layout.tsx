import type { Metadata } from 'next'
import { inter, interDisplay } from './fonts'
import './globals.css'
import '../styles/fonts.css'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import ErrorBoundary from '@/components/error-boundary'
import '@/lib/error-handler'

export const metadata: Metadata = {
  title: 'LivingTech Creative',
  description: 'Created with Creative Engineering',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable} font-sans`} style={{ fontFamily: 'Trap, sans-serif' }}>
      <head>
        <script src="/error-suppression.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Immediate error suppression
                var originalError = console.error;
                var originalWarn = console.warn;
                var originalLog = console.log;
                
                var extensionPatterns = [
                  'tx_attempts_exceeded',
                  'tx_ack_timeout',
                  'Failed to initialize messaging',
                  'host-console-events',
                  'host-network-events',
                  'host-dom-snapshot',
                  'pW.getSingleton',
                  'pq',
                  'p4',
                  'Object.p6',
                  'fM.getSingleton',
                  'fT',
                  'f$',
                  'Object.fV',
                  'cy.getSingleton',
                  'cb',
                  'cA',
                  'Object.cI',
                  'diagnostics',
                  'errors'
                ];
                
                function isExtensionError(message) {
                  var lowerMessage = message.toLowerCase();
                  return extensionPatterns.some(function(pattern) {
                    return lowerMessage.includes(pattern.toLowerCase());
                  });
                }
                
                console.error = function() {
                  var message = Array.prototype.join.call(arguments, ' ');
                  if (isExtensionError(message)) return;
                  originalError.apply(console, arguments);
                };
                
                console.warn = function() {
                  var message = Array.prototype.join.call(arguments, ' ');
                  if (isExtensionError(message)) return;
                  originalWarn.apply(console, arguments);
                };
                
                console.log = function() {
                  var message = Array.prototype.join.call(arguments, ' ');
                  if (isExtensionError(message)) return;
                  originalLog.apply(console, arguments);
                };
                
                window.addEventListener('unhandledrejection', function(event) {
                  var message = event.reason ? event.reason.toString() : '';
                  if (isExtensionError(message)) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                }, true);
                
                window.addEventListener('error', function(event) {
                  var message = event.message || '';
                  if (isExtensionError(message)) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white">
        <ErrorBoundary>
          {children}
          <FloatingWhatsApp />
        </ErrorBoundary>
      </body>
    </html>
  )
}
