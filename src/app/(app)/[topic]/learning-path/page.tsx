
import type { Metadata } from 'next';
import LearningPathClient from './learning-path-client';

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const topic = decodeURIComponent(params.topic);
  const formattedTopic = topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Master ${formattedTopic} | Sasha's Path`,
    description: `An AI-generated course to help you master ${formattedTopic}, from beginner to advanced topics, with interactive lessons and quizzes.`,
  };
}

export default function LearningPathPage({ params }: { params: { topic: string } }) {
  return <LearningPathClient topic={params.topic} />;
}
