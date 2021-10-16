import React from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import api from '../../utils/api'
import { useHistory } from 'react-router-dom'

function DebounceSelect ({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const fetchRef = React.useRef(0)
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])
  return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
  )
} // Usage of DebounceSelect

async function fetchUserList (query) {
  return api().get(`/landing/search/items/${query}`).then((res) => (
    res.data.map((item) => ({
      label: item.name,
      value: item.id,
      category: item.category
    }
    ))
  ))
}

const CustomSearch = () => {
  const history = useHistory()
  const [value, setValue] = React.useState([])
  return (
        <DebounceSelect
            mode="multiple"
            value={null}
            onSelect={({ label, value }) => {
              history.push(`/landing/category/shs/${label}/detail/${value}`)
            }
            }
            placeholder="Type here to search"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            style={{
              width: '100%'
            }}
        />
  )
}

export default CustomSearch
