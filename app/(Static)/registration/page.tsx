'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useSupabase } from '@/context/SupabaseProvider'
import { StudentFormData } from '@/types'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<StudentFormData>({
    defaultValues: {
      colleges: [{ college_name: '', college_address: '', year_graduated: 0 }],
      organizations: [{ org_name: '', position: '' }]
    }
  })

  const { fields: collegeFields, append: appendCollege } = useFieldArray({
    control,
    name: 'colleges'
  })
  const { fields: orgFields, append: appendOrg } = useFieldArray({
    control,
    name: 'organizations'
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { supabase } = useSupabase()

  const onSubmit = async (data: StudentFormData) => {
    setLoading(true)

    try {
      const { error } = await supabase.from('ccb_registrations').insert([data])

      if (error) throw error
      setSuccess(true)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-[74px]">
      <Header />
      <div className="container min-h-screen mx-auto px-4 md:px-8 py-8 my-8 bg-white shadow-md rounded-lg">
        {success && (
          <div className="text-center mt-10 text-green-600">
            <h1>Registration successfull.</h1>
          </div>
        )}
        {!success && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Pre-Enrollment Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Fields (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Last Name</label>
                  <input
                    {...register('lastname', { required: true })}
                    className="app__input_standard"
                    placeholder="Last Name"
                  />
                  {errors.lastname && (
                    <p className="text-red-600">Last name is required</p>
                  )}
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>First Name</label>
                  <input
                    {...register('firstname', { required: true })}
                    className="app__input_standard"
                    placeholder="First Name"
                  />
                  {errors.firstname && (
                    <p className="text-red-600">First name is required</p>
                  )}
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Middle Name</label>
                  <input
                    {...register('middlename', { required: true })}
                    className="app__input_standard"
                    placeholder="Middle Name"
                  />
                  {errors.middlename && (
                    <p className="text-red-600">Middle name is required</p>
                  )}
                </div>
              </div>

              {/* Course and Year (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 mr-2 mt-2">
                  <label>Course</label>
                  <input
                    {...register('course', { required: true })}
                    className="app__input_standard"
                    placeholder="Course"
                  />
                  {errors.course && (
                    <p className="text-red-600">Course is required</p>
                  )}
                </div>

                <div className="w-full md:w-1/3 mr-2 mt-2">
                  <label>Year</label>
                  <input
                    {...register('year', { required: true })}
                    className="app__input_standard"
                    placeholder="Year"
                  />
                  {errors.year && (
                    <p className="text-red-600">Year is required</p>
                  )}
                </div>
              </div>

              {/* Birthday, Place of Birth, and Civil Status (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Birthday</label>
                  <input
                    type="date"
                    {...register('birthday')}
                    className="app__input_standard"
                  />
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Place of Birth</label>
                  <input
                    {...register('place_of_birth')}
                    className="app__input_standard"
                    placeholder="Place of Birth"
                  />
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Civil Status</label>
                  <input
                    {...register('civil_status')}
                    className="app__input_standard"
                    placeholder="Civil Status"
                  />
                </div>
              </div>

              {/* Gender, Email, Contact Number (Inline) */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Gender</label>
                  <input
                    {...register('gender')}
                    className="app__input_standard"
                    placeholder="Gender"
                  />
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="app__input_standard"
                    placeholder="Email"
                  />
                </div>

                <div className="w-full md:w-1/4 mr-2 mt-2">
                  <label>Contact Number</label>
                  <input
                    {...register('contact_number')}
                    className="app__input_standard"
                    placeholder="Contact Number"
                  />
                </div>
              </div>

              {/* Previous Colleges (Multiple Entries) */}
              <div className="mt-4">&nbsp;</div>
              <div>
                <h2 className="font-bold">Colleges Attended</h2>
                {collegeFields.map((college, index) => (
                  <div key={college.id} className="flex flex-wrap">
                    <div className="w-full md:w-1/4 mr-2 mt-2">
                      <label>College Name</label>
                      <input
                        {...register(`colleges.${index}.college_name`)}
                        className="app__input_standard"
                        placeholder="College Name"
                      />
                    </div>

                    <div className="w-full md:w-1/4 mr-2 mt-2">
                      <label>Address</label>
                      <input
                        {...register(`colleges.${index}.college_address`)}
                        className="app__input_standard"
                        placeholder="College Address"
                      />
                    </div>

                    <div className="w-full md:w-1/4 mr-2 mt-2">
                      <label>Year Graduated</label>
                      <input
                        type="number"
                        {...register(`colleges.${index}.year_graduated`)}
                        className="app__input_standard"
                        placeholder="Year Graduated"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendCollege({
                      college_name: '',
                      college_address: '',
                      year_graduated: 0
                    })
                  }
                  className="app__btn_blue_xs mt-2"
                >
                  Add College
                </button>
              </div>

              {/* Organizations Affiliated (Multiple Entries) */}
              <div className="mt-4">&nbsp;</div>
              <div>
                <h2 className="font-bold">Organizations Affiliated</h2>
                {orgFields.map((org, index) => (
                  <div key={org.id} className="flex flex-wrap">
                    <div className="w-full md:w-1/3 mr-2 mt-2">
                      <label>Organization Name</label>
                      <input
                        {...register(`organizations.${index}.org_name`)}
                        className="app__input_standard"
                        placeholder="Organization Name"
                      />
                    </div>

                    <div className="w-full md:w-1/3 mr-2 mt-2">
                      <label>Position</label>
                      <input
                        {...register(`organizations.${index}.position`)}
                        className="app__input_standard"
                        placeholder="Position"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => appendOrg({ org_name: '', position: '' })}
                  className="app__btn_blue_xs mt-2"
                >
                  Add Organization
                </button>
              </div>

              <div className="mt-10">&nbsp;</div>

              {/* Agree to Terms */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('agree_terms', { required: true })}
                  className="mr-2"
                />
                <label>I agree to the terms and conditions</label>
              </div>
              {errors.agree_terms && (
                <p className="text-red-600">This field is required</p>
              )}

              <button
                type="submit"
                className="app__btn_green"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
