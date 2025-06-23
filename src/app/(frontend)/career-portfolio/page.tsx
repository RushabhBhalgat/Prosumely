import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const careerPortfolioPage = () => {
  return <ServiceProductPage {...servicesData.careerPortfolio} />
}

export default careerPortfolioPage
