import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const coverLetterPage = () => {
  return <ServiceProductPage {...servicesData.coverLetter} />
}

export default coverLetterPage
