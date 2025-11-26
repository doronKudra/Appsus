import { noteService } from "../services/note.service.js"

const { useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function useSearchParamsFilter(setFilterBy) {

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const filterFromSearchPrms = noteService.getFilterFromSearchParams(searchParams)
        setFilterBy(filterFromSearchPrms)
    }, [])

    function setExistingSearchPrms(filterBy) {
        setSearchParams(filterBy)
    }

    return setExistingSearchPrms

}