'use client'

import React, { useState } from 'react'
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

  if (!isOpen) return null

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-4xl max-h-screen m-4 bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
          <div className="flex items-center gap-2">
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
            <button
              onClick={onDownload}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
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
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <div className="flex justify-center">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="border border-gray-300 rounded-lg shadow-lg"
              style={{
                width: `${800 * zoom}px`,
                height: `${1000 * zoom}px`,
                minWidth: '300px',
                minHeight: '400px',
              }}
              title={title}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
