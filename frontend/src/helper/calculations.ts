
export function getAverageScore(movie: any) {
    let totalScore: number = 0;
    movie.reviews.forEach((review: any) => {
        totalScore += review.score;
    });
    return totalScore / movie.reviews.length;
    
}


export function getAverageScoreStarString(movie: any) {
    const averageScore = getAverageScore(movie);

    let starString = "";
    for (let i = 0; i < 5; i++) {
        if (averageScore > i)
            starString += "★";
        else
            starString += "☆";
    }
    return starString;
}
