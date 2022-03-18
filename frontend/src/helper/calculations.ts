
export function getAverageScore(movie: any) : number {
    if (movie.reviews.length === 0) return 0;
    
    let totalScore: number = 0;
    movie.reviews.forEach((review: any) => {
        totalScore += review.score;
    });
    let num = totalScore / movie.reviews.length;
    return Math.round(num * 100) / 100;
    
}


export function getAverageScoreStarString(movie: any) : string {
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
