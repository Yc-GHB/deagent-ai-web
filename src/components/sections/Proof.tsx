'use client'

export function Proof() {
  return (
    <div className='bg-black'>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-4xl divide-y divide-white/10'>
          <h2 className='text-2xl font-bold leading-10 tracking-tight text-white'>Proof of Insight</h2>
          <dl className='mt-10 space-y-6 divide-y divide-white/10'>
            <div className='pt-6'>
              <dt>
                <div className='flex w-full items-start justify-between text-left'>
                  <span className='text-base font-semibold leading-7 text-white'>
                    What is Proof of Insight?
                  </span>
                </div>
              </dt>
              <dd className='mt-2 pr-12'>
                <p className='text-base leading-7 text-gray-400'>
                  Proof of Insight is our unique mechanism that rewards users for contributing valuable insights and knowledge to the network.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
