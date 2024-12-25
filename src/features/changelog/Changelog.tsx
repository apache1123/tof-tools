import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";
import { gt } from "@suchipi/femver";
import { useSnapshot } from "valtio";

import { ButtonModal } from "../../components/presentational/common/Modal/ButtonModal";
import { changelog } from "../../definitions/changelog";
import { changelogState } from "../../states/changelog/changelog";

export function Changelog() {
  const { lastSeenChangelogSemver } = useSnapshot(changelogState);
  const lastChangelogSemver = changelog[changelog.length - 1].semver;

  // If `lastSeenChangelogSemver` is `undefined`, it is considered uninitialized, and we wait for there to be a `lastSeenChangelogSemver` before deciding whether to show the changelog or not
  // This is needed because if we for example set the initial value of lastSeenChangelogSemver to 1.0.0, then the changelog will always show on page load no matter what, as it is a lower version.
  // value = undefined -> not shown -> load value from storage (default is 1.0.0) -> decide to show or not
  if (!lastSeenChangelogSemver) return null;

  // If the last seen changelog version is less than the last version in the changelog, show the changelog
  const hasUnseenChangelog = gt(lastChangelogSemver, lastSeenChangelogSemver);

  return (
    <ButtonModal
      openByDefault={hasUnseenChangelog}
      buttonContent="Changelog"
      modalTitle="Changelog"
      modalContent={
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            }, // left-align self, according to docs
          }}
        >
          {[...changelog]
            .reverse()
            .map(({ semver, date, title, description, isImportant }) => (
              <TimelineItem key={semver}>
                <TimelineOppositeContent>
                  {date.toLocaleDateString()}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={isImportant ? "warning" : "primary"} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <>
                    <Typography
                      variant="h6"
                      component="div"
                      color={isImportant ? "error" : "primary"}
                    >
                      {title}
                    </Typography>
                    {description}
                  </>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      }
      onClose={() => {
        changelogState.lastSeenChangelogSemver =
          changelog[changelog.length - 1].semver;
      }}
      fullWidth
      maxWidth="xl"
    />
  );
}
