import { useState } from "react";

type UseMutation<Payload, Result> = {
    queryFunction: (payload: Payload) => Promise<Result>,
}

export default function useMutation<Payload, Result>({
    queryFunction,
}: UseMutation<Payload, Result>) {
    const [result, setResult] = useState<Result | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const mutate = (payload: Payload) => {
        setLoading(true)

        queryFunction(payload)
            .then(responseData => {
                setResult(responseData)
            })
            .catch((error: unknown) => {
                setError(error as Error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return { mutate, result, isLoading, error }
}