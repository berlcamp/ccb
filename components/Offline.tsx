'use client'
import { useState } from 'react'

export default function OfflinePage() {
  const [reconnecting, setReconnecting] = useState(false)

  return (
    <div className="z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="sm:h-[calc(100%-3rem)] max-w-lg my-6 mx-auto relative w-auto pointer-events-none">
        <div className="max-h-full overflow-hidden border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-gray-50 bg-clip-padding rounded-sm outline-none text-current">
          <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-md font-bold leading-normal text-gray-800"
              id="exampleModalScrollableLabel"
            >
              Connection Offline
            </h5>
          </div>

          <div className="modal-body relative p-4">
            <div className="app__form_field_container">
              <div className="w-full">
                <div className="app__label_standard">
                  You are currently offline. Trying to reconnect ...{' '}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 flex-shrink-0 flex-wrap items-center justify-end pt-4 border-t border-gray-200 rounded-b-md">
              <button
                type="submit"
                onClick={() => setReconnecting(true)}
                className="flex items-center bg-emerald-500 hover:bg-emerald-600 border border-emerald-600 font-medium px-2 py-1 text-sm text-white rounded-sm"
              >
                {reconnecting ? 'Reconnecting...' : 'Try to Reconnect'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
