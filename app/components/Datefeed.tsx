"use client";

import Dates from "./Dates";
import Error from "./Error";
import Loading from "./Loading";

import { useFetch } from "../lib/hooks";
import { CardBody, CardContainer, CardHeader } from "./Card";
import { Date } from "@/types/payload-types";

const Datefeed = () => {
  const { data, error, loading } = useFetch<Date[]>(
    `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}dates`,
  );

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      {!data || data.length === 0 ? (
        <CardContainer>
          <CardHeader titel="Kalender" />
          <CardBody>
            <p className="text-center">Keine anstehenden Termine.</p>
          </CardBody>
        </CardContainer>
      ) : (
        <CardContainer>
          <CardHeader titel="Kalender" />
          <CardBody>
            <div className="flex gap-2">
              {data
                .sort(
                  (a, b) =>
                    new Date(a.dates.date).getTime() -
                    new Date(b.dates.date).getTime(),
                )
                .map((date) => (
                  <Dates key={date.id} data={date} />
                ))}
            </div>
          </CardBody>
        </CardContainer>
      )}
    </>
  );
};

export default Datefeed;
