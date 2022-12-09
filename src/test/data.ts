import { LiveProps, LiveCardProps, WithCardProps } from "../shared/Props";

export const WithsData: Array<WithCardProps> = [
  { id: "with1", title: "모집1", time: "11:22", place: "place1", preferredGenres: ["모든 장르"] },
  { id: "with2", title: "모집2", time: "12:22", place: "place2", preferredGenres: ["발라드", "인디"] },
  { id: "with3", title: "모집3", time: "13:22", place: "place3", preferredGenres: ["랩/힙합"] },
  { id: "with4", title: "모집4", time: "14:22", place: "place4", preferredGenres: ["댄스, R&B"] },
  { id: "with5", title: "모집5", time: "15:22", place: "place5", preferredGenres: ["모든 장르"] },
  { id: "with6", title: "모집6", time: "16:22", place: "place6", preferredGenres: ["트로트"] },
  { id: "with7", title: "모집7", time: "17:22", place: "place7", preferredGenres: ["팝송, 락"] },
];

export const LiveData: LiveProps = {
  id: "live1",
  author: "hoon",
  video: {
    url: "https://firebasestorage.googleapis.com/v0/b/byhoon-bdf04.appspot.com/o/KakaoTalk_20221024_231102528.mp4?alt=media&token=9a848311-95ca-4e65-ae4a-e0cdd6b2ed44",
  },
  song: {
    id: "song1",
    title: "hoon송",
    artist: "hoon",
    albumImage:
      "https://firebasestorage.googleapis.com/v0/b/myplaylist-783c8.appspot.com/o/KakaoTalk_20210927_025101163.jpg?alt=media&token=4f3c0769-6a1b-40ee-a787-a4fd7e11487f",
  },
  title: "강가에서 기타치는 영상",
  content:
    "테스트니까 일단 적당히 길게 적어봅니다. 강가에서 기타치는 영상 무료로 다운받았는데 소리가 안 나와서 아쉬워요. 그래도 영상 나오는지 테스트하는 거니까 괜찮겠죠?",
};

export const LivesData: Array<LiveCardProps> = [
  {
    id: "live1",
    title: "강가에서 기타치는 영상1",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/byhoon-bdf04.appspot.com/o/storyimg%2F6167ec97-2285-44c3-8a90-997111bd98a6?alt=media&token=a5d94d8f-1c65-42aa-9c78-5a751db16bff",
  },
  {
    id: "live2",
    title: "강가에서 기타치는 영상2",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/byhoon-bdf04.appspot.com/o/storyimg%2F6167ec97-2285-44c3-8a90-997111bd98a6?alt=media&token=a5d94d8f-1c65-42aa-9c78-5a751db16bff",
  },
  {
    id: "live3",
    title: "강가에서 기타치는 영상3",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/byhoon-bdf04.appspot.com/o/storyimg%2F6167ec97-2285-44c3-8a90-997111bd98a6?alt=media&token=a5d94d8f-1c65-42aa-9c78-5a751db16bff",
  },
  {
    id: "live4",
    title: "강가에서 기타치는 영상4",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/byhoon-bdf04.appspot.com/o/storyimg%2F6167ec97-2285-44c3-8a90-997111bd98a6?alt=media&token=a5d94d8f-1c65-42aa-9c78-5a751db16bff",
  },
  {
    id: "live5",
    title: "강가에서 기타치는 영상5",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/byhoon-bdf04.appspot.com/o/storyimg%2F6167ec97-2285-44c3-8a90-997111bd98a6?alt=media&token=a5d94d8f-1c65-42aa-9c78-5a751db16bff",
  },
  {
    id: "live6",
    title: "강가에서 기타치는 영상6",
    thumbnail:
      "https://firebasestorage.googleapis.com/v0/b/byhoon-bdf04.appspot.com/o/storyimg%2F6167ec97-2285-44c3-8a90-997111bd98a6?alt=media&token=a5d94d8f-1c65-42aa-9c78-5a751db16bff",
  },
];
