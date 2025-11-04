declare module 'react-simple-maps' {
  import { ComponentType, SVGProps } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      rotate?: [number, number, number]
      scale?: number
    }
    width?: number
    height?: number
    style?: React.CSSProperties
    children?: React.ReactNode
  }

  export interface ZoomableGroupProps {
    center?: [number, number]
    zoom?: number
    children?: React.ReactNode
  }

  export interface GeographiesProps {
    geography: string
    fill?: string
    stroke?: string
    strokeWidth?: number
    children?: (args: { geographies: any[] }) => React.ReactNode
  }

  export interface GeographyProps {
    geography: any
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: SVGProps<SVGPathElement>
      hover?: SVGProps<SVGPathElement>
      pressed?: SVGProps<SVGPathElement>
    }
    onClick?: () => void
  }

  export interface MarkerProps {
    coordinates: [number, number]
    children?: React.ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const Marker: ComponentType<MarkerProps>
}
