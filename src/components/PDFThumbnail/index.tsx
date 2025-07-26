'use client'

import React from 'react'
import { FileText } from 'lucide-react'

interface PDFThumbnailProps {
  pdfUrl: string
  title: string
  className?: string
}

export const PDFThumbnail: React.FC<PDFThumbnailProps> = ({ className = '' }) => {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}
    >
      <div className="text-center p-6">
        <div className="w-16 h-20 mx-auto mb-3 bg-red-500 rounded-lg flex items-center justify-center">
          <FileText className="w-10 h-12 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-700">Interview Questions</p>
        <p className="text-xs text-gray-500 mt-1">PDF Guide</p>
      </div>
    </div>
  )
}
