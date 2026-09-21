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
  id: string;
  title: string;
  description: string;
  createdAt: string;
  authorId: string;
  category: string;
  videoUrl: string;
  pointsReward: number;
}

type MyLearning = {
  id: string;
  userId: string;
  courseId: string;
  startDate: string;
  status: 'in-progress' | 'completed'
}


type Reward = {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  availableQuantity: number;
  imageUrl?: string;
}


type MyRewards = {
  id: string;
  userId: string;
  rewardId: string;
  redeemedAt: string;
}