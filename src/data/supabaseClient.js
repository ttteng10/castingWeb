import { createClient } from "@supabase/supabase-js";

// Supabase 프로젝트 URL & API 키
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase 클라이언트 생성
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const addWebtoon = async (webtoon, platform, day, img) => {
  webtoon = webtoon.trim();
  platform = platform.trim().toLowerCase();
  day = day.trim().toLowerCase();
  const { data: existingWebtoon, error: selectError } = await supabase
    .from("webtoons")
    .select("*")
    .eq("webtoon", webtoon)
    .eq("platform", platform)
    .eq("day", day)
    .limit(1);

  if (selectError && selectError.code !== "PGRST116") {
    console.error("Error checking existing data: ", selectError);
    return "exist";
  }

  if (existingWebtoon.length > 0) {
    console.log("Webtoon already exists, skipping insert:", existingWebtoon);
    return "exist";
  }
  const { data, error } = await supabase
    .from("webtoons")
    .insert([{ webtoon: webtoon, platform: platform, day: day, img: img }]);

  if (error) {
    console.error("Error inserting data: ", error);
  } else {
    console.log("Data inserted succesful", data);
  }
};

export const addWebtoonImg = async (file) => {
  if (!file) return null;

  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  const fileExtension = file.name.split(".").pop();
  const fileName = `${timestamp}-${randomNum}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from("webtoon-images")
    .upload(`${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Image upload failed:", error);
    return null;
  }
  console.log("Image uploaded successfully:", data);

  return `${SUPABASE_URL}/storage/v1/object/public/webtoon-images/${fileName}`;
};

export const getAllWebtoons = async () => {
  const { data, error } = await supabase.from("webtoons").select("*");

  if (error) {
    console.error("Error fetching webtoons: ", error);
    return [];
  }

  return data;
};

export const getCharactersByWebtoonId = async (id) => {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("webtoonId", id);

  if (error) {
    console.error("Error fetching characters:", error);
    return [];
  }

  return data;
};

export const addCharacter = async (id, name, img) => {
  // 1️⃣ 공백 제거 및 소문자 변환 (필요한 경우)
  name = name.trim();

  // 2️⃣ 중복 검사 (id와 name이 같은 데이터가 있는지 확인)
  const { data: existingCharacter, error: checkError } = await supabase
    .from("characters")
    .select("*")
    .eq("webtoonId", id)
    .eq("name", name)
    .limit(1);

  if (checkError && checkError.code !== "PGRST116") {
    console.error("Error checking character existence:", checkError);
    return "error";
  }

  // 3️⃣ 이미 존재하는 경우 삽입하지 않음
  if (existingCharacter.length > 0) {
    console.log("Character already exists:", existingCharacter);
    return "exist";
  }

  // 4️⃣ 중복되지 않으면 삽입
  const { data, error } = await supabase
    .from("characters")
    .insert([{ webtoonId: id, name: name, img: img }]);

  if (error) {
    console.error("Error inserting character:", error);
    return "error";
  }
  console.log("Character inserted successfully:", data);
  return "success";
};

export const addCharacterImg = async (file) => {
  if (!file) return null;

  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  const fileExtension = file.name.split(".").pop();
  const fileName = `${timestamp}-${randomNum}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from("character-images")
    .upload(`${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Image upload failed:", error);
    return null;
  }
  console.log("Image uploaded successfully:", data);

  return `${SUPABASE_URL}/storage/v1/object/public/character-images/${fileName}`;
};

export const addActor = async (id, actor, actorImg, characterID) => {
  // 1️⃣ 공백 제거 및 소문자 변환 (필요한 경우)
  actor = actor.trim();

  // 2️⃣ 중복 검사 (id와 name이 같은 데이터가 있는지 확인)
  const { data: existingActor, error: checkError } = await supabase
    .from("actors")
    .select("*")
    .eq("actor", actor)
    .eq("webtoonId", id)
    .eq("characterID", characterID)
    .limit(1);

  if (checkError && checkError.code !== "PGRST116") {
    console.error("Error checking character existence:", checkError);
    return "error";
  }

  // 3️⃣ 이미 존재하는 경우 삽입하지 않음
  if (existingActor.length > 0) {
    return "exist";
  }

  // 4️⃣ 중복되지 않으면 삽입
  const { data, error } = await supabase.from("actors").insert([
    {
      webtoonId: id,
      actor: actor,
      actorImg: actorImg,
      characterID: characterID,
    },
  ]);

  if (error) {
    return "error";
  }
  console.log("Actor inserted successfully:", data);
  return "success";
};

export const addActorImg = async (file) => {
  if (!file || !file.name) {
    console.error("No file or file name found.");
    return null;
  }

  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  const fileExtension = file.name.split(".").pop(); // 확장자 추출
  const fileName = `${timestamp}-${randomNum}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from("actor-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Image upload failed:", error);
    return null;
  }
  console.log("Image uploaded successfully:", data);

  return `${SUPABASE_URL}/storage/v1/object/public/actor-images/${fileName}`;
};

export const getActorByWebtoonId = async (id, characterID) => {
  const { data, error } = await supabase
    .from("actors")
    .select("*")
    .eq("webtoonId", id)
    .eq("characterID", characterID)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching characters:", error);
    return [];
  }

  return data;
};

export const incrementVote = async (actorId) => {
  const { data: existingActor, error: selectError } = await supabase
    .from("actors")
    .select("vote") // 'vote' 컬럼만 선택해서 가져옵니다.
    .eq("id", actorId)
    .single(); // 해당 id에 맞는 데이터 하나만 가져옵니다.

  if (selectError) {
    console.error("Error fetching actor:", selectError);
    return;
  }

  if (!existingActor) {
    console.error("Actor not found with id:", actorId);
    return;
  }

  // Vote 증가
  const updatedVote = existingActor.vote + 1;

  const { data, error } = await supabase
    .from("actors")
    .update({ vote: updatedVote }) // Vote 값을 1 증가
    .eq("id", actorId); // 특정 id를 조건으로 설정

  if (error) {
    console.error("Error updating vote:", error);
    return;
  }

  console.log("Vote incremented successfully:", data);
};

export const getAllHelpRequests = async () => {
  const { data, error } = await supabase.from("helpRequests").select("*");

  if (error) {
    console.error("Error fetching helpRequests: ", error);
    return [];
  }

  return data ?? [];
};

export const addHelpRequest = async (title, detail, password) => {
  const { data, error } = await supabase
    .from("helpRequests")
    .insert([
      { title: title, detail: detail, password: password, state: "wait" },
    ]);

  if (error) {
    console.error("Error inserting helpRequest: ", error);
    return;
  }

  return data;
};
