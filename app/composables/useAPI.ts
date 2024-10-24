import type { FetchResult, UseFetchOptions } from '#app'
import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack'
import type { AsyncData, KeysOf, PickFrom } from '#app/composables/asyncData'
import { defu } from 'defu'
import type { DefaultAsyncDataErrorValue, DefaultAsyncDataValue } from '#app/defaults'
import type { FetchError } from 'ofetch'

function createCustomUseFetch<GlobalError = FetchError>(baseOptions: Partial<Omit<UseFetchOptions<unknown>, 'key' | 'transform' | 'body' | 'default' | 'method' | 'params' | 'pick'>>) {
  return <
    ResT = void,
    ErrorT = GlobalError,
    ReqT extends NitroFetchRequest = NitroFetchRequest,
    Method extends AvailableRouterMethod<ReqT> = ResT extends void ? ('get' extends AvailableRouterMethod<ReqT> ? 'get' : AvailableRouterMethod<ReqT>) : AvailableRouterMethod<ReqT>,
    _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
    DataT = _ResT,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
    DefaultT = DefaultAsyncDataValue,
  >(
    req: MaybeRefOrGetter<ReqT>,
    opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>
  ): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | DefaultAsyncDataErrorValue> => {
    return useFetch(req, defu(opts, baseOptions, { $fetch: useNuxtApp().$api }) as typeof opts)
  }
}

export const useAPI = createCustomUseFetch<FetchError<string>>({})
