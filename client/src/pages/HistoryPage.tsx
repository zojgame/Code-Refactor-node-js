import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import {
  LoadingModal,
  Sidebar,
  NotAuthModal,
  HistoryTerminal,
} from "@/components";
import { getHistory } from "@/api/user";
import useStore from "@/store/store";
import { HistoryRes } from "@/types";
import { languages } from "@/consts/data";

const getLastWeekHistory = (his: HistoryRes[]) => {
  const convertedDates = [...his]
    .sort((a, b) => {
      const prev = new Date(a.dateTimeCreate);
      const next = new Date(b.dateTimeCreate);

      return Number(next) - Number(prev);
    })
    .filter((date) => {
      const startDate = new Date();
      const endDate = new Date(date.dateTimeCreate);

      const timeDifference = startDate.getTime() - endDate.getTime();

      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      const isMoreThanWeek = daysDifference <= 7;
      return isMoreThanWeek;
    });

  return convertedDates;
};

const getPreviousHistory = (his: HistoryRes[]) => {
  const convertedDates = [...his]
    .sort((a, b) => {
      const prev = new Date(a.dateTimeCreate);
      const next = new Date(b.dateTimeCreate);

      return Number(next) - Number(prev);
    })
    .filter((date) => {
      const startDate = new Date();
      const endDate = new Date(date.dateTimeCreate);

      const timeDifference = startDate.getTime() - endDate.getTime();

      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      const isMoreThanWeek = daysDifference > 7;
      return isMoreThanWeek;
    });

  return convertedDates;
};

const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);
  const [history, setHistory] = useState<HistoryRes[]>([]);
  const { setModal, setSelectedHistory, selectedHistory } = useStore();

  useEffect(() => {
    if (isLoading) {
      setModal(<LoadingModal />);
    } else {
      if (!isAuth) {
        setModal(<NotAuthModal />);
      } else {
        setModal(null);
      }
    }
  }, [isLoading, isAuth, setModal]);

  useEffect(() => {
    setModal(<LoadingModal />);
    const token = localStorage.getItem("token");
    if (token) {
      getHistory(token)
        .then((data) => {
          if (data) {
            setHistory(data as HistoryRes[]);
            setIsAuth(true);
          }
        })
        .catch(() => {
          setIsAuth(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsAuth(false);
      setIsLoading(false);
    }
  }, [setModal]);

  const handleOnHistClick = (hist: HistoryRes) => {
    return () => {
      setIsLoading(true);
      setTimeout(() => {
        setSelectedHistory(hist);
        setIsLoading(false);
      }, 300);
    };
  };

  const lastWeekDates = getLastWeekHistory(history);
  const previos = getPreviousHistory(history);

  return (
    <div className="flex sm:flex-col">
      <Sidebar className="w-[60%] overflow-y-auto flex px-8 sm:w-full ">
        <div className="text-sm text-left text-[#666] font-semibold ">
          Последние 7 дней
        </div>
        {lastWeekDates.map((hist) => {
          const date = hist.dateTimeCreate.split(" ")[0].split(".").join("-");
          const convertedDate = dayjs(date).format("DD MMM YYYY");
          const language =
            languages.find((_, index) => String(index + 1) === hist.progLang) ??
            "javascript";

          return (
            <div
              onClick={handleOnHistClick(hist)}
              className={`grid grid-cols-2 min-h-[50px]  items-center rounded-lg cursor-pointer select-none ${
                hist.id === selectedHistory?.id
                  ? "bg-[#40414f]"
                  : "hover:bg-[#353541]"
              }`}
              key={hist.dateTimeCreate}
            >
              <div className="">{convertedDate}</div>
              <div className="">{language}</div>
            </div>
          );
        })}
        {previos.length !== 0 && (
          <>
            <div className="text-sm text-left text-[#666] font-semibold ">
              Ранее
            </div>
            {previos.map((hist) => {
              const date = hist.dateTimeCreate
                .split(" ")[0]
                .split(".")
                .join("-");
              const convertedDate = dayjs(date).format("DD MMM YYYY");

              return (
                <div
                  className="grid grid-cols-2 min-h-[50px] hover:bg-[#40414f] items-center rounded-lg cursor-pointer select-none"
                  key={hist.dateTimeCreate}
                >
                  <div className="">{convertedDate}</div>
                  <div className="">javascript</div>
                </div>
              );
            })}
          </>
        )}
      </Sidebar>
      <div className="w-full h-full">
        <HistoryTerminal
          title="Ваш код"
          defaultCode={selectedHistory?.requestCode ?? undefined}
        />
      </div>
      <div className="w-full h-full">
        <HistoryTerminal
          title="Генерация"
          defaultCode={selectedHistory?.responseCode ?? undefined}
        />
      </div>
    </div>
  );
};

export { HistoryPage };
