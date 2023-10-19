"use client";
import { Song } from "../../types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import usePlayer from "@/hooks/usePlayer";
import UseGetSongByArtistTitle, {
  sanitizeInput,
} from "@/hooks/useGetSongByArtistTitle";
import CustomRange from "./CustomRange";
import { secondsToTime } from "@/utils/secondToTime";

interface Props {
  songDescription: Song | null;
  allSong: Song[];
  setSongDescription: Dispatch<SetStateAction<Song | null>>;
}

const PlayerContent = ({
  songDescription,
  setSongDescription,
  allSong,
}: Props) => {
  const player = usePlayer();
  const [durationStatus, setDurationStatus] = useState(0);
  const [volume, setVolume] = useState(1);
  const Icon = player.isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = async () => {
    if (player.activeId >= player.ids.length) {
      const randomIndexSong = Math.floor(Math.random() * allSong.length);
      player.audioSong?.pause();
      const nextSong = await UseGetSongByArtistTitle(
        allSong[randomIndexSong].artist + allSong[randomIndexSong].title
      );
      player.setSong(nextSong);
      setSongDescription(allSong[randomIndexSong]);
      player.setIds([...player.ids, allSong[randomIndexSong]]);
      player.setId(player.ids.length);
      nextSong?.play();
    } else {
      player.audioSong?.pause();
      const nextSong = await UseGetSongByArtistTitle(
        player.ids[player.activeId + 1].artist +
          player.ids[player.activeId + 1].title
      );
      player.setSong(nextSong);
      setSongDescription(player.ids[player.activeId + 1]);
      player.setId(player.activeId + 1);
      nextSong?.play();
    }
  };

  const onPlayPrev = async () => {
    let index = player.activeId - 1;
    console.log(player.ids);
    if (index < 0) {
      return;
    }
    player.setId(index);
    player.audioSong?.pause();
    const safeInput = sanitizeInput(
      player.ids[index].artist + player.ids[index].title
    );
    const prevSong = await UseGetSongByArtistTitle(safeInput);
    prevSong.play();
    player.setSong(prevSong);
    setSongDescription(player.ids[index]);
  };

  const handlePlay = () => {
    if (!player.isPlaying) {
      player.audioSong?.play();
      player.setIsPlaying(true);
    } else {
      player.setIsPlaying(false);
      player.audioSong?.pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    if (player.audioSong) {
      player.audioSong.volume = volume;
    }
  }, [player.audioSong, volume]);

  useEffect(() => {
    const updateProgressBar = () => {
      if (player.audioSong && player.isPlaying) {
        setDurationStatus(player.audioSong.currentTime);
      }
    };
    const progressBarInterval = setInterval(updateProgressBar, 1000);
    return () => {
      clearInterval(progressBarInterval);
    };
  }, [player.audioSong, player.isPlaying]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full ">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          {/* <MediaItem data={song}/> */}
          {songDescription?.title}
          {/* <LikeButton songId={song.id}/> */}
        </div>
      </div>
      <div className="flex md:hidden flex-col col-auto w-full justify-end items-center">
        {" "}
        {/*mobile play pause button*/}
        <div className="flex flex-1">
          <div onClick={onPlayPrev} className="mr-1">
            <AiFillStepBackward
              size={30}
              className="text-neutral-400  cursor-pointer hover:text-white transition"
            />
          </div>
          <div
            onClick={handlePlay}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
          <div onClick={onPlayNext} className="ml-1">
            <AiFillStepForward
              size={30}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
          </div>
        </div>
      </div>

      <div className="hidden h-full md:flex flex-col flex-1 justify-center items-center w-full max-w-[722px] gap-x-6">
        <div className="flex flex-1 items-center">
          <div onClick={onPlayPrev}>
            <AiFillStepBackward
              size={25}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
          </div>
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={25} className="text-black" />
          </div>
          <div onClick={onPlayNext}>
            <AiFillStepForward
              size={25}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
          </div>
        </div>
        <div className="flex flex-1 w-full items-center gap-3">
          <div className="flex text-[0.688rem] text-white text-opacity-70">
            {secondsToTime(durationStatus)}
          </div>
            <CustomRange
              step={0.1}
              min={0}
              max={songDescription?.duration || 1}
              value={durationStatus}
              onChange={(value: number) => {
                if (player.audioSong) {
                  player.audioSong.currentTime = value;
                }
              }}
            />
            <div className="flex text-[0.688rem] text-white text-opacity-70">
                {secondsToTime(songDescription?.duration)}
            </div>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
