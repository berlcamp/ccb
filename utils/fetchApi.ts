import { fullTextQuery } from '@/utils/text-helper'
import { createBrowserClient } from '@supabase/ssr'

// types
import type { AccountTypes, Employee } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function fetchPages(
  filters: {
    filterKeyword?: string
    filterType?: string
  },
  perPageCount: number,
  rangeFrom: number
) {
  try {
    let query = supabase
      .from('ccb_pages')
      .select('*,ccb_users:created_by(id,firstname,middlename,lastname)', {
        count: 'exact'
      })

    // Full text search
    if (filters.filterKeyword && filters.filterKeyword !== '') {
      const searchQuery: string = fullTextQuery(filters.filterKeyword)
      query = query.textSearch('title', searchQuery)
    }

    // filter type
    if (filters.filterType && filters.filterType !== '') {
      query = query.eq('type', filters.filterType)
    }

    // Per Page from context
    const from = rangeFrom
    const to = from + (perPageCount - 1)

    // Per Page from context
    query = query.range(from, to)

    // Order By
    query = query.order('id', { ascending: false })

    const { data, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    return { data, count }
  } catch (error) {
    console.error('fetch error', error)
    return { data: [], count: 0 }
  }
}

export async function fetchRegistrations(
  filters: {
    filterKeyword?: string
    filterSchool?: string
    filterOffice?: string
  },
  perPageCount: number,
  rangeFrom: number
) {
  try {
    let query = supabase
      .from('ccb_registrations')
      .select('*', { count: 'exact' })

    // Search match
    if (filters.filterKeyword && filters.filterKeyword !== '') {
      query = query.or(
        `firstname.ilike.%${filters.filterKeyword}%,middlename.ilike.%${filters.filterKeyword}%,lastname.ilike.%${filters.filterKeyword}%`
      )
    }

    // Per Page from context
    const from = rangeFrom
    const to = from + (perPageCount - 1)

    // Per Page from context
    query = query.range(from, to)

    // Order By
    query = query.order('id', { ascending: false })

    const { data: userData, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    const data: Employee[] = userData

    return { data, count }
  } catch (error) {
    console.error('fetch error', error)
    return { data: [], count: 0 }
  }
}

export async function logError(
  transaction: string,
  table: string,
  data: string,
  error: string
) {
  await supabase.from('error_logs').insert({
    system: 'hrm',
    transaction,
    table,
    data,
    error
  })
}

export async function fetchErrorLogs(perPageCount: number, rangeFrom: number) {
  try {
    let query = supabase.from('error_logs').select('*', { count: 'exact' })

    // Per Page from context
    const from = rangeFrom
    const to = from + (perPageCount - 1)

    // Per Page from context
    query = query.range(from, to)

    // Order By
    query = query.order('id', { ascending: false })

    const { data, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    return { data, count }
  } catch (error) {
    console.error('fetch error', error)
    return { data: [], count: 0 }
  }
}

export async function fetchAccounts(
  filters: { filterStatus?: string },
  perPageCount: number,
  rangeFrom: number
) {
  try {
    let query = supabase
      .from('ccb_users')
      .select('*', { count: 'exact' })
      .neq('email', 'berlcamp@gmail.com')

    // filter status
    if (filters.filterStatus && filters.filterStatus !== '') {
      query = query.eq('status', filters.filterStatus)
    }

    // Per Page from context
    const from = rangeFrom
    const to = from + (perPageCount - 1)

    // Per Page from context
    query = query.range(from, to)

    // Order By
    query = query.order('id', { ascending: false })

    const { data: userData, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }

    const data: AccountTypes[] = userData

    return { data, count }
  } catch (error) {
    console.error('fetch error', error)
    return { data: [], count: 0 }
  }
}

export async function fetchDynamicPages(
  slug: string,
  perPageCount: number,
  rangeFrom: number
) {
  try {
    let query = supabase
      .from('ccb_pages')
      .select('*', { count: 'exact' })
      .eq('is_deleted', false)
      .eq('status', 'published')
      .eq('type', slug)

    // Per Page from context
    const from = rangeFrom
    const to = from + (perPageCount - 1)

    // Per Page from context
    query = query.range(from, to)

    // Order By
    query = query.order('id', { ascending: false })

    const { data, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }
    return { data, count }
  } catch (error) {
    console.error('fetch pages error', error)
    return { data: [], count: 0 }
  }
}
