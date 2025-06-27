import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export const getFormatTimeAgo = (createdAt: Dayjs) => {
    const now = dayjs();
    const diffTime = now.diff(createdAt, "minute");

    const diffSeconds = now.diff(createdAt, "second");
    if (diffSeconds < 60) {
      return `${diffSeconds}s ago`;
    } else if (diffTime < 60) {
      return `${diffTime}m ago`;
    } else if (diffTime < 1440) {
      return `${Math.floor(diffTime / 60)}h ago`;
    } else if (diffTime < 10080) {
      return `${Math.floor(diffTime / 1440)}d ago`;
    } else if (diffTime < 525600) {
      return `${Math.floor(diffTime / 10080)}mo. ago`;
    }
  };