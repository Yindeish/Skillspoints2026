type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    jobTitle: string;
    profilePictureUrl: string;
    totalPoints: number;
}

type MicroCourse = {
    title: string;
    description: string;
    createdAt: string;
    authorId: string;
  idMicroCourse Int @id @default (autoincrement())
  category      String ?
    videoUrl      String ?
        pointsReward  Int @default (0)
}

type Learning = {

}


type Reward = {

}


type RewardHistory = {

}