'use client';
import { useState } from 'react';
import { WhatsAppButton } from './whatsapp';
export function TrialForm() {
  const [device, setDevice] = useState('Amazon Fire TV / Fire Stick');
  const [notes, setNotes] = useState('');
  return (
    <div className="trial-form">
      <span className="eyebrow">YOUR FIRST WATCH STARTS HERE</span>
      <h2>Let’s find your setup.</h2>
      <p>Choose your device and send a request directly to KroozIPTV on WhatsApp.</p>
      <label htmlFor="trial-device">What will you watch on?</label>
      <select id="trial-device" value={device} onChange={(e) => setDevice(e.target.value)}>
        {[
          'Amazon Fire TV / Fire Stick',
          'Android TV / Google TV',
          'Samsung / LG Smart TV',
          'Apple TV',
          'iPhone / iPad',
          'Android phone / tablet',
          'Windows',
          'macOS',
          'NVIDIA Shield',
          'MAG device',
          'Not sure yet',
        ].map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <label htmlFor="trial-notes">
        Anything you’d like to check? <span>(optional)</span>
      </label>
      <textarea
        id="trial-notes"
        rows={3}
        maxLength={500}
        placeholder="A channel, TV model, or setup question…"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <WhatsAppButton
        source="free-trial-form"
        message={`Hi KroozIPTV, I would like to request a free trial. My device is ${device}.${notes.trim() ? ` I would also like to check: ${notes.trim()}` : ''} Please confirm availability, duration, and connection limits.`}
        className="primary"
      >
        Request Your Free Trial
      </WhatsAppButton>
      <small>
        This opens WhatsApp. Nothing is submitted or stored on this website. Trial availability and
        terms are confirmed in your conversation.
      </small>
    </div>
  );
}
