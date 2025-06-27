import { ExternalLink } from 'lucide-react'

const CancellationAndRefundPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cancellation & Refund Policy for Prosumely</h1>

      <p className="mb-6">
        Thank you for choosing Prosumely for your resume writing needs. This Cancellation & Refund
        Policy ("Policy") outlines our guidelines regarding order cancellations and refunds. Please
        read this Policy carefully before placing an order with us, as it explains the circumstances
        under which cancellations and refunds are permitted.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Cancellation of Services</h2>
        <p className="mb-2">
          1.1 Order cancellations can only be accommodated if the cancellation request is made
          before the resume writing process has commenced. Once the process has started,
          cancellations are not possible.
        </p>
        <p className="mb-2">
          1.2 To request a cancellation, please contact our customer support team at [contact
          information] with your order details.
        </p>
        <p className="mb-2">
          1.3 We reserve the right to refuse a cancellation request if the resume writing process
          has already begun or if the requested cancellation is deemed unreasonable or abusive.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Refund Policy</h2>
        <p className="mb-4">
          <strong>Refund turn around time:</strong> 5-7 days
        </p>
        <p className="mb-2">
          2.1 Prosumely does not offer refunds for completed or in-progress orders.
        </p>
        <p className="mb-2">
          2.2 Once the resume writing process has commenced, no refunds will be provided, regardless
          of whether the final product has been delivered or not.
        </p>
        <p className="mb-2">
          2.3 Refunds will not be provided if the client has approved the final resume draft or if
          Prosumely has commenced the delivery of the final product.
        </p>
        <p className="mb-2">
          2.4 In cases where we are unable to deliver the Services due to unforeseen circumstances
          or other valid reasons, we may offer a refund at our discretion. Such instances will be
          evaluated on a case-by-case basis.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Revisions</h2>
        <p className="mb-2">
          3.1 We strive to ensure customer satisfaction and provide high-quality resumes.
        </p>
        <p className="mb-2">
          3.2 After receiving the final resume draft, clients have the opportunity to request
          reasonable revisions within the specified time frame, as determined by Prosumely.
        </p>
        <p className="mb-2">
          3.3 Revision requests should be based on the original instructions provided by the client.
          Excessive or unreasonable revision requests may be refused.
        </p>
        <p className="mb-2">
          3.4 If revisions are requested within the allotted time frame, we will work closely with
          the client to address any concerns and make the necessary modifications to the resume.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Exceptional Circumstances</h2>
        <p className="mb-2">
          4.1 In exceptional cases where a refund is deemed appropriate by Prosumely, the refund
          amount will be determined based on the specific circumstances and the portion of the
          Services that have not been rendered.
        </p>
        <p className="mb-2">
          4.2 Any refund granted will be processed within a reasonable time frame and using the
          original payment method used for the order, unless otherwise agreed upon.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Changes to the Policy</h2>
        <p className="mb-2">
          5.1 Prosumely reserves the right to modify or update this Cancellation & Refund Policy at
          any time without prior notice.
        </p>
        <p className="mb-2">
          5.2 Any changes to the Policy will be effective immediately upon posting the updated
          Policy on our website. It is your responsibility to review this Policy periodically for
          any changes.
        </p>
      </section>

      <div className="mt-8 border-t pt-6">
        <p className="mb-4">
          If you have any questions or concerns regarding our Cancellation & Refund Policy, please{' '}
          <a href="/contact" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
            Contact Us <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </p>
        <p className="text-sm text-gray-600">
          This Cancellation & Refund Policy was last updated on 13-07-2023.
        </p>
      </div>
    </div>
  )
}

export default CancellationAndRefundPage
