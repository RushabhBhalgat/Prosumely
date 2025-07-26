'use client'

import React, { useState, useEffect } from 'react'
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react'

interface PDFPreviewProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
  onDownload: () => void
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  onDownload,
}) => {
  const [zoom, setZoom] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isOpen) return null

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 sm:p-4">
      <div className="relative w-full h-full max-w-4xl max-h-screen bg-white rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white shrink-0">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate mr-2">{title}</h3>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Hide zoom controls on mobile to save space */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600 px-2">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={onDownload}
              className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto bg-gray-100 min-h-0">
          <div className="flex justify-center p-2 sm:p-4 h-full">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0${isMobile ? '&view=FitH' : ''}`}
              className="border border-gray-300 rounded-lg shadow-lg"
              style={
                isMobile
                  ? {
                      width: '100%',
                      height: '100%',
                      minHeight: '500px',
                    }
                  : {
                      width: `${Math.max(600, 800 * zoom)}px`,
                      height: `${Math.max(700, 1000 * zoom)}px`,
                    }
              }
              title={title}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
