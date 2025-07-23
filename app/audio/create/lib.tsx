export async function uploadAudioFile(file: File, accessToken: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/upload-url/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify({
      file_name: file.name,
      content_type: file.type
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to get upload URL');
  }

  const { upload_url, key } = await res.json();

  await fetch(upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file
  });

  return key; // use this to save metadata
}

export async function saveRecordingMetadata(key: string, metadata: {
  title: string
  notes?: string
  tags?: string[]
  location?: string
  date?: string 
}, accessToken: string) {
  const body = {
    s3_key: key,  
    ...metadata
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/save-recording/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save metadata');
  }
}

export async function deleteRecording(recordingId: string, accessToken: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/${recordingId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete recording');
  }

  return true;
}