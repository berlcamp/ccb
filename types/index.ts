import type { MouseEventHandler, ReactNode } from 'react'

export interface SelectUserNamesProps {
  settingsData: any[]
  multiple: boolean
  type: string
  handleManagerChange: (newdata: any[], type: string) => void
  title: string
}

export interface UserAccessTypes {
  user_id: string
  type: string
  ccb_user: namesType
}

export interface searchUser {
  firstname: string
  middlename: string
  lastname: string
  uuid?: string
  id: string
}

export interface namesType {
  firstname: string
  middlename: string
  lastname: string
  avatar_url: string
  id: string
}

export interface CustomButtonTypes {
  isDisabled?: boolean
  btnType?: 'button' | 'submit'
  containerStyles?: string
  textStyles?: string
  title: string
  rightIcon?: ReactNode
  handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface NotificationTypes {
  id: string
  message: string
  created_at: string
  url: string
  type: string
  user_id: string
  reference_id?: string
  reference_table: string
  is_read: boolean
}

export interface Employee {
  id: string
  firstname: string
  middlename: string
  lastname: string
  gender: string
  password: string
  temp_password: string
  avatar_url: string
  email: string
  status: string
}

interface LogMessageTypes {
  field: string
  old_value: string
  new_value: string
}

export interface AccountTypes {
  id: string
  name: string
  firstname: string
  middlename: string
  lastname: string
  status: string
  password: string
  avatar_url: string
  email: string
  org_id: string
  created_by: string
  temp_password: string
  active_office_id: string
}

export interface PagesFormTypes {
  id: string
  title: string
  excerpt: string
  thumbnail_photo: string
  status: string
  content: string
  type: string
  sidebar_type: string
  is_deleted: boolean
  publish_date: string
  slug?: string
  menu_id: string
  menu: MenuTypes
}

export interface MenuTypes {
  id: string
  title: string
  type: string
  sub_menus: SubmenuTypes[]
}

export interface SubmenuTypes {
  title: string
  type: string
  slug?: string
  ref: number
}

export interface PageSlugsTypes {
  title: string
  slug: string
}

export interface SliderTypes {
  id: string
  title: string
  content: string
  status: string
  is_deleted: boolean
}

export interface AdministrationTypes {
  id: string
  name: string
  position: string
  type: string
  image_url: string
  on_sidebar: boolean
}

export interface StudentFormData {
  id?: string
  lastname: string
  firstname: string
  middlename: string
  course: string
  year: string
  birthday?: string
  place_of_birth?: string
  civil_status?: string
  gender?: string
  email?: string
  contact_number?: string
  home_address?: string
  province?: string
  city_town?: string
  zipcode?: string
  current_address?: string
  father_fullname?: string
  mother_fullname?: string
  colleges: {
    college_name: string
    college_address: string
    year_graduated: number
  }[]
  organizations: { org_name: string; position: string }[]
  agree_terms?: boolean
}
