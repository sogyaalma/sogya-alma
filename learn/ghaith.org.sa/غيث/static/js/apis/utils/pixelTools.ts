// src/utils/analytics.ts
import TikTokPixel from "tiktok-pixel";
import { sha256 } from "js-sha256";

// Initialize TikTok Pixel once
TikTokPixel.init("D5B51SBC77U4D2G7VKU0", {
  debug: process.env.NODE_ENV !== "production",
});

export const normalizeAndHashEmail = (email: string): string => {
  if (!email || typeof email !== "string") return "";
  return sha256(email.trim().toLowerCase());
};

export const normalizeAndHashPhone = (phone: string): string => {
  if (!phone || typeof phone !== "string") return "";
  return sha256(phone.replace(/\D/g, ""));
};

// -------------------- Snap Pixel --------------------
export const trackSnapDonation = (donationData: {
  price: number | string;
  currency?: string;
  transactionId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}) => {
  if (typeof window !== "undefined" && (window as any).snaptr) {
    try {
      const priceValue =
        typeof donationData.price === "string"
          ? parseFloat(donationData.price)
          : donationData.price;

      const eventData: any = {
        price: priceValue,
        currency: donationData.currency || "SAR",
        uuid_c1: donationData.transactionId || "unknown_transaction",
        user_email: donationData.email || "",
        user_phone_number: donationData.phone || "",
        user_hashed_email: donationData.email
          ? normalizeAndHashEmail(donationData.email)
          : "",
        user_hashed_phone_number: donationData.phone
          ? normalizeAndHashPhone(donationData.phone)
          : "",
        firstname: donationData.firstName || "",
        lastname: donationData.lastName || "",
      };

      Object.keys(eventData).forEach((key) => {
        if (eventData[key] === "") delete eventData[key];
      });

      (window as any).snaptr("track", "ADD_BILLING", eventData);
    } catch (err) {
      console.error("Snap Pixel error:", err);
    }
  } else {
    console.warn("Snap Pixel not initialized");
  }
};

// -------------------- TikTok Pixel --------------------
export const trackTikTokDonation = (donationData: {
  price: number | string;
  currency?: string;
  transactionId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}) => {
  if (typeof window !== "undefined") {
    try {
      const priceValue =
        typeof donationData.price === "string"
          ? parseFloat(donationData.price)
          : donationData.price;

      TikTokPixel.track("Complete donation", {
        value: priceValue,
        currency: donationData.currency || "SAR",
        content_id: donationData.transactionId,
        first_name: donationData.firstName || "",
        last_name: donationData.lastName || "",
        email: donationData.email || "",
        phone: donationData.phone || "",
      });
    } catch (err) {
      console.error("TikTok Pixel error:", err);
    }
  }
};

// -------------------- Meta Pixel --------------------
export const trackMetaDonation = (donationData: {
  price: number | string;
  currency?: string;
  transactionId: string;
  contentName?: string;
}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    try {
      const value =
        typeof donationData.price === "string"
          ? parseFloat(donationData.price)
          : donationData.price;

      (window as any).fbq("trackCustom", "Complete donation", {
        value: value,
        currency: donationData.currency || "SAR",
        content_name: donationData.contentName || "Donation",
        content_ids: [donationData.transactionId],
      });
    } catch (err) {
      console.error("Meta Pixel error:", err);
    }
  } else {
    console.warn("Meta Pixel not initialized");
  }
};
// -------------------- X (Twitter) Pixel --------------------
export const trackXDonation = (donationData: {
  price: number | string;
  currency?: string;
  transactionId: string;
}) => {
  if (typeof window !== "undefined" && (window as any).twq) {
    try {
      const priceValue =
        typeof donationData.price === "string"
          ? parseFloat(donationData.price)
          : donationData.price;

      (window as any).twq("event", "Complete donation",{
        value: priceValue,
        currency: donationData.currency || "SAR",
        conversion_id: donationData.transactionId,
      });
    } catch (err) {
      console.error("X Pixel error:", err);
    }
  } else {
    console.warn("X Pixel not initialized");
  }
};
