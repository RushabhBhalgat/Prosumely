import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const membershipApplicationPage = () => {
  return <ServiceProductPage {...servicesData.membershipApplication} />
}

export default membershipApplicationPage
