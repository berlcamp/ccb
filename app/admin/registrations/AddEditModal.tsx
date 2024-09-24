'use client'

// Types
import type { StudentFormData } from '@/types'

interface ModalProps {
  hideModal: () => void
  editData: StudentFormData | null
}

const AddEditModal = ({ hideModal, editData }: ModalProps) => {
  return (
    <>
      <div className="app__modal_wrapper">
        <div className="app__modal_wrapper2_large">
          <div className="app__modal_wrapper3">
            <div className="app__modal_header">
              <h5 className="app__modal_header_text">Details</h5>
              <button
                onClick={hideModal}
                type="button"
                className="app__modal_header_btn"
              >
                &times;
              </button>
            </div>

            <div className="app__modal_body space-y-4">
              {/* Name Fields (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Last Name</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>First Name</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Middle Name</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>
              </div>

              {/* Course and Year (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 mr-2 mt-2">
                  <label>Course</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>

                <div className="w-full md:w-1/3 mr-2 mt-2">
                  <label>Year</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>
              </div>

              {/* Birthday, Place of Birth, and Civil Status (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Birthday</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Place of Birth</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Civil Status</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>
              </div>

              {/* Gender, Email, Contact Number (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Gender</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Email</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Contact Number</label>
                  <div className="app__label_value">{editData?.lastname}</div>
                </div>
              </div>

              {/* Previous Colleges (Multiple Entries) */}
              <div className="mt-4">&nbsp;</div>
              <div>
                <div className="font-bold">Colleges Attended</div>
                {editData?.colleges &&
                  editData?.colleges.map((college, index) => (
                    <div key={index} className="flex flex-wrap">
                      <div className="w-full md:w-1/4 mr-2 mt-2">
                        <label>College Name</label>
                        <div className="app__label_value">
                          {college.college_name}
                        </div>
                      </div>

                      <div className="w-full md:w-1/4 mr-2 mt-2">
                        <label>Address</label>
                        <div className="app__label_value">
                          {college.college_address}
                        </div>
                      </div>

                      <div className="w-full md:w-1/4 mr-2 mt-2">
                        <label>Year Graduated</label>
                        <div className="app__label_value">
                          {college.year_graduated}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Organizations Affiliated (Multiple Entries) */}
              <div className="mt-4">&nbsp;</div>
              <div>
                <div className="font-bold">Organizations Affiliated</div>
                {editData?.organizations &&
                  editData?.organizations.map((org, index) => (
                    <div key={index} className="flex flex-wrap">
                      <div className="w-full md:w-1/3 mr-2 mt-2">
                        <label>Organization Name</label>
                        <div className="app__label_value">{org.org_name}</div>
                      </div>

                      <div className="w-full md:w-1/3 mr-2 mt-2">
                        <label>Position</label>
                        <div className="app__label_value">{org.position}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEditModal
