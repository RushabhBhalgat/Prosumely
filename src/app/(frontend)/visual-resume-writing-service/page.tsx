import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const ATSResumePage = () => {
  return <ServiceProductPage {...servicesData.visualResume} />
}

export default ATSResumePage
