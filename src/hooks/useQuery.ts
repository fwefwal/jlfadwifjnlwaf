import { useState, useEffect } from "react";

type UseQuery<T> = {
    queryFunction: () => Promise<T>,
    dependencies: string[]
}

export default function useQuery<T>({
    queryFunction,
    dependencies = []
} : UseQuery<T>) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)

        queryFunction()
            .then(responseData => {
                setData(responseData)
            })
            .catch((error: unknown) => {
                setError(error as Error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, dependencies)

    return { data, isLoading, error }
}