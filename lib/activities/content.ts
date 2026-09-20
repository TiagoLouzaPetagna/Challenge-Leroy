export type ActivityContentStatus = "published" | "draft";

export type ActivityContentPackage<TContent, TAllowlists> = {
  casePackageId: string;
  activityId: string;
  activityVersion: number;
  status: ActivityContentStatus;
  editorialDate: string;
  content: TContent;
  allowlists: TAllowlists;
  criticalControlIds: readonly string[];
  feedback: {
    success: string;
    review: string;
  };
  debrief: {
    title: string;
    body: string;
  };
};

