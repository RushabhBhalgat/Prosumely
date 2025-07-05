import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const interviewCoachingPage = () => {
  return <ServiceProductPage {...servicesData.interviewCoaching} />
}

export default interviewCoachingPage
