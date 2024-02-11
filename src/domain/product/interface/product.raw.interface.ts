export interface ProductRaw {
  data: {
    post: {
      id: string;
      slug: string;
      name: string;
      trashedAt: null;
      isArchived: boolean;
      product: {
        id: string;
        slug: string;
        passedOnePost: boolean;
        name: string;
        postsCount: number;
        reviewsCount: number;
        reviewersCount: number;
        reviewsRating: number;
        isMaker: boolean;
        reviewers: {
          edges: [
            {
              node: {
                id: string;
                username: string;
                name: string;
                avatarUrl: string;
                __typename: string;
              };
              __typename: string;
            },
            {
              node: {
                id: string;
                username: string;
                name: string;
                avatarUrl: string;
                __typename: string;
              };
              __typename: string;
            },
          ];
          __typename: string;
        };
        viewerReview: null;
        tagline: string;
        logoUuid: string;
        isNoLongerOnline: boolean;
        __typename: string;
        url: string;
        isSubscribed: boolean;
        description: string;
        followersCount: number;
        topics: {
          edges: [
            {
              node: {
                id: string;
                slug: string;
                name: string;
                __typename: string;
              };
              __typename: string;
            },
            {
              node: {
                id: string;
                slug: string;
                name: string;
                __typename: string;
              };
              __typename: string;
            },
          ];
          __typename: string;
        };
        isMuted: boolean;
        canEdit: boolean;
        websiteUrl: string;
        websiteDomain: string;
        isClaimed: boolean;
        isViewerTeamMember: boolean;
        viewerPendingTeamRequest: null;
        cleanUrl: string;
        firstPost: {
          id: string;
          createdAt: string;
          __typename: string;
        };
      };
      targetedAd: null;
      redirectToProduct: null;
      tagline: string;
      dailyRank: string;
      createdAt: string;
      thumbnailImageUuid: string;
      productState: string;
      __typename: string;
      featuredAt: string;
      updatedAt: string;
      disabledWhenScheduled: boolean;
      hasVoted: boolean;
      votesCount: number;
      isAvailable: boolean;
      links: [
        {
          id: string;
          redirectPath: string;
          storeName: string;
          websiteName: string;
          devices: [];
          __typename: string;
        },
      ];
      badges: {
        edges: [
          {
            node: {
              id: string;
              post: {
                id: string;
                name: string;
                __typename: string;
              };
              position: number;
              period: string;
              date: string;
              __typename: string;
            };
            __typename: string;
          },
        ];
        __typename: string;
      };
      userId: string;
      canManage: boolean;
      description: string;
      pricingType: string;
      url: string;
      promo: null;
      topics: {
        edges: [
          {
            node: {
              id: string;
              slug: string;
              name: string;
              __typename: string;
            };
            __typename: string;
          },
          {
            node: {
              id: string;
              slug: string;
              name: string;
              __typename: string;
            };
            __typename: string;
          },
          {
            node: {
              id: string;
              slug: string;
              name: string;
              __typename: string;
            };
            __typename: string;
          },
        ];
        totalCount: 3;
        __typename: string;
      };
      canCreateUpcomingEvent: boolean;
      canViewUpcomingEventCreateBtn: boolean;
      upcomingEvent: {
        id: string;
        canEdit: boolean;
        approved: boolean;
        __typename: string;
      };
      isMaker: boolean;
      isHunter: boolean;
      moderationReason: null;
      primaryLink: {
        id: string;
        url: string;
        __typename: string;
      };
      moderation: null;
      commentsCount: number;
      weeklyRank: string;
      user: {
        id: string;
        name: string;
        username: string;
        avatarUrl: string;
        __typename: string;
      };
      makers: [
        {
          id: string;
          name: string;
          username: string;
          avatarUrl: string;
          __typename: string;
        },
        {
          id: string;
          name: string;
          username: string;
          avatarUrl: string;
          __typename: string;
        },
        {
          id: string;
          name: string;
          username: string;
          avatarUrl: string;
          __typename: string;
        },
      ];
      media: [
        {
          id: string;
          originalHeight: number;
          originalWidth: number;
          imageUuid: string;
          mediaType: string;
          metadata: {
            url: string;
            videoId: string;
            interactiveDemoId: null;
            platform: string;
            __typename: string;
          };
          __typename: string;
        },
        {
          id: string;
          originalHeight: number;
          originalWidth: number;
          imageUuid: string;
          mediaType: string;
          metadata: {
            url: null;
            videoId: null;
            interactiveDemoId: null;
            platform: null;
            __typename: string;
          };
          __typename: string;
        },
        {
          id: string;
          originalHeight: number;
          originalWidth: number;
          imageUuid: string;
          mediaType: string;
          metadata: {
            url: null;
            videoId: null;
            interactiveDemoId: null;
            platform: null;
            __typename: string;
          };
          __typename: string;
        },
        {
          id: string;
          originalHeight: number;
          originalWidth: number;
          imageUuid: string;
          mediaType: string;
          metadata: {
            url: null;
            videoId: null;
            interactiveDemoId: null;
            platform: null;
            __typename: string;
          };
          __typename: string;
        },
        {
          id: string;
          originalHeight: number;
          originalWidth: number;
          imageUuid: string;
          mediaType: string;
          metadata: {
            url: null;
            videoId: null;
            interactiveDemoId: null;
            platform: null;
            __typename: string;
          };
          __typename: string;
        },
      ];
      commentPrompt: string;
      structuredData: {
        '@context': string;
        '@type': string;
        name: string;
        description: string;
        datePublished: string;
        dateModified: string;
        image: string;
        screenshot: string[];
        applicationCategory: string;
        author: [
          {
            '@type': string;
            name: string;
            image: string;
            url: string;
          },
          {
            '@type': string;
            name: string;
            image: string;
            url: string;
          },
          {
            '@type': string;
            name: string;
            image: string;
            url: string;
          },
        ];
      };
      meta: {
        canonicalUrl: string;
        creator: string;
        description: string;
        image: string;
        mobileAppUrl: string;
        oembedUrl: string;
        robots: null;
        title: string;
        type: string;
        author: string;
        authorUrl: string;
        __typename: string;
      };
    };
  };
}
