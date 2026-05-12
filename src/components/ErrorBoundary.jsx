/**
 * Error Boundary Component
 * Catches and displays errors that occur in child components
 * Prevents entire app crash when a component fails
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
          <div className="w-full max-w-lg">
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Something went wrong
                  </h1>
                  <p className="text-textMuted mb-4 leading-relaxed">
                    An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
                  </p>

                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 mb-4">
                      <p className="text-xs font-mono text-red-200 break-words">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo && (
                        <p className="text-xs font-mono text-red-200 mt-2 break-words">
                          {this.state.errorInfo.componentStack}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={this.resetError}
                      className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => window.location.href = '/home'}
                      className="px-4 py-2 rounded-lg bg-surface text-white font-medium hover:bg-surface/90 transition-colors"
                    >
                      Go Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
