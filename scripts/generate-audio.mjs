#!/usr/bin/env node
// Generate TTS audio files for EP-133 guide using ElevenLabs

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel - clear, friendly female voice

if (!ELEVENLABS_API_KEY) {
  console.error('Missing ELEVENLABS_API_KEY environment variable');
  process.exit(1);
}

// All lesson steps that need audio
const lessons = [
  {
    id: 'power',
    steps: [
      'Flip the POWER switch on the top right edge',
      'Turn the VOLUME knob on the left side to about halfway',
      'Connect headphones to OUTPUT on the top left, or just use the speaker',
      'Start tapping the numbered pads zero through nine. Each plays a sound!',
      'Press different GROUP buttons A, B, C, D on the left, and tap pads again'
    ]
  },
  {
    id: 'firstbeat',
    steps: [
      'Press GROUP A to make sure you are in the drum group',
      'Press PLAY. You will hear clicking from the metronome',
      'Press RECORD, the red button. Now your taps are captured',
      'Tap pad 1 on beats 1 and 3 for the kick drum',
      'Tap pad 2 on beats 2 and 4 for the snare',
      'Press RECORD again to stop recording',
      'Your beat now loops! You did it.'
    ]
  },
  {
    id: 'erase',
    steps: [
      'While playing, hold ERASE and tap a pad to remove that sound',
      'To clear the whole pattern, hold ERASE and press PLAY',
      'To UNDO your last recording, hold SHIFT and press ERASE',
      'Rebuild your beat using the layer approach'
    ]
  },
  {
    id: 'hihats',
    steps: [
      'Get your kick and snare playing',
      'Find the hi-hat by tapping around pads 7 through 9',
      'Press RECORD',
      'Tap steady eighth notes, twice per beat',
      'Press RECORD to stop',
      'Adjust levels: hold FADER, select Level, slide to adjust Group A volume'
    ]
  },
  {
    id: 'groups',
    steps: [
      'Your drums are playing in Group A',
      'Press GROUP C. Pads now trigger BASS sounds',
      'Press RECORD and tap out a bass note or two',
      'Press RECORD to stop',
      'Press GROUP D for melodic sounds. Add a chord',
      'Press GROUP A to verify drums are still there'
    ]
  },
  {
    id: 'tempo',
    steps: [
      'Hold the TEMPO button',
      'Turn the main dial. Watch B P M change in the display',
      'Try 85 BPM for chill, 120 BPM for pop, 140 for energetic',
      'For swing, find the swing parameter in tempo settings',
      'Swing adds human groove. Try 55 to 60 percent'
    ]
  },
  {
    id: 'sounds',
    steps: [
      'Press SOUND to enter sample browser',
      'Turn the dial to scroll through 999 slots',
      'Samples are organized: kicks, snares, hats, percussion, bass, melodic',
      'Press a pad to assign the current sound to that pad',
      'Press SHIFT plus SOUND, which is EDIT, to tweak the sound'
    ]
  },
  {
    id: 'fx',
    steps: [
      'Hold the FX button',
      'Turn dial to choose: delay, reverb, distortion, chorus, filter, compressor',
      'Release FX, then hold FX and move the FADER to send a group to the effect',
      'More fader equals more effect on that group',
      'Try delay on your snare and hi-hats for instant depth!'
    ]
  },
  {
    id: 'punchin',
    steps: [
      'Get your beat playing',
      'While holding pads, you trigger real-time effects',
      'Hold a pad firmly. Different pads give different effects',
      'Try beat repeat, filter sweeps, tape stop effects',
      'Pressure controls intensity. Press harder for more',
      'Release to snap back to normal'
    ]
  },
  {
    id: 'scenes',
    steps: [
      'You have a beat. This is Scene 1',
      'Hold SHIFT and press MAIN, which is COMMIT',
      'You are now in Scene 2 with copies of your patterns',
      'Change something: add a fill, remove the hi-hat, vary the bass',
      'SHIFT plus MAIN again for Scene 3',
      'Navigate: hold MAIN and press plus or minus'
    ]
  },
  {
    id: 'keys',
    steps: [
      'Press GROUP D for melodic sounds',
      'Tap a pad to select a synth sound',
      'Press the KEYS button on the left side',
      'Pads now play that sound at different pitches!',
      'Tap out a melody. It is like a mini keyboard',
      'Press RECORD to capture your melody',
      'Press KEYS again to exit'
    ]
  },
  {
    id: 'guitar',
    steps: [
      'Build a full beat: drums in A, bass in C, maybe keys in D',
      'Set tempo to match your song idea',
      'Balance with the fader. Give yourself room in the mix',
      'Press PLAY',
      'Grab your guitar, plug into your amp',
      'Strum along and find the chords that work!',
      'Use scenes to switch between song sections'
    ]
  }
];

async function generateAudio(text, filename) {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${error}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const fs = await import('fs/promises');
  await fs.writeFile(filename, buffer);
  console.log(`✓ Generated: ${filename}`);
}

async function main() {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const audioDir = new URL('../static/dad/audio', import.meta.url).pathname;
  
  // Ensure directory exists
  await fs.mkdir(audioDir, { recursive: true });
  
  let totalSteps = 0;
  let generated = 0;
  
  for (const lesson of lessons) {
    for (let i = 0; i < lesson.steps.length; i++) {
      totalSteps++;
      const filename = path.join(audioDir, `${lesson.id}-${i}.mp3`);
      
      // Check if file already exists
      try {
        await fs.access(filename);
        console.log(`⏭ Skipping (exists): ${filename}`);
        continue;
      } catch {
        // File doesn't exist, generate it
      }
      
      try {
        await generateAudio(lesson.steps[i], filename);
        generated++;
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));
      } catch (error) {
        console.error(`✗ Failed: ${filename} - ${error.message}`);
      }
    }
  }
  
  console.log(`\nDone! Generated ${generated} new files (${totalSteps} total steps)`);
}

main().catch(console.error);
