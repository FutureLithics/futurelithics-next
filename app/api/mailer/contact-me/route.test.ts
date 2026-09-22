import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const sendMail = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail })),
  },
}));

describe("POST /api/mailer/contact-me", () => {
  beforeEach(() => {
    sendMail.mockReset();
    process.env.EMAIL_USER = "test@example.com";
    process.env.EMAIL_PASSWORD = "password";
    process.env.EMAIL_RECIPIENT = "owner@example.com";
  });

  it("sends email and returns success for valid payload", async () => {
    sendMail.mockResolvedValue(undefined);

    const request = new Request("http://localhost/api/mailer/contact-me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        message: "Need help with a data visualization project.",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, message: "Email sent successfully" });
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail.mock.calls[0][0].subject).toContain("Ada Lovelace");
  });

  it("returns 500 when email delivery fails", async () => {
    sendMail.mockRejectedValue(new Error("SMTP unavailable"));

    const request = new Request("http://localhost/api/mailer/contact-me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        message: "Need help.",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ success: false, message: "Failed to send email" });
  });
});
