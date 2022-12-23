import React, {useCallback, useState} from 'react'
import './App.css'
import {RotatingLines} from "react-loader-spinner";

interface IReviewsItem {
    id: string
    userName: string
    userImage: string
    date: string
    score: number
    scoreText: string
    url: string
    title: string
    text: string
    replyDate: string
    replyText: string
    version: string
    thumbsUp: number
    criterias: Array<{
        criteria: string
        rating: number
    }>
}

function App() {
    const [packageName, setPackageName] = useState("")
    const [reviewsList, setReviewsList] = useState<IReviewsItem[] | null>()
    const [loading, setLoading] = useState(false)


    const fetchReviewsCallback = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost/getReviews?packageName=${packageName}`);

            const reviews = await response.json();
            setReviewsList(reviews.data);
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }, [packageName]);

    return loading ? <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
    /> : (
        <div className="App">
            <div>
                <input
                    className="packageInput"
                    type="text"
                    value={packageName}
                    onChange={(evt) => setPackageName(evt.target.value)}
                />
                <button onClick={() => fetchReviewsCallback()}>
                    Get All Reviews
                </button>
            </div>
            <div>
                <p>Found {reviewsList?.length} Reviews</p>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Review</th>
                        <th>Version</th>
                        <th>Relevance</th>
                    </tr>
                    {reviewsList?.map((review: IReviewsItem) => {
                        const date = new Date(review.date).toLocaleDateString();
                        return (
                            <tr key={review.id}>
                                <td>{date}</td>
                                <td>{review.score}</td>
                                <td className="review">{review.text}</td>
                                <td >{review.version}</td>
                                <td>{review.thumbsUp}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    )
}

export default App